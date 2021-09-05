package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.elasticsearch.ElasticService;
import com.mindbridge.core.domains.post.dto.*;
import com.mindbridge.core.domains.postReaction.PostReactionService;
import com.mindbridge.core.domains.postReaction.dto.ReceivedPostReactionDto;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.postVersion.PostVersionRepository;
import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.domains.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostService {

	private final PostRepository postRepository;

	private final CommentService commentService;

	private final PostReactionService postReactionService;

	private final PostVersionRepository postVersionRepository;

	private final UserRepository userRepository;

	private final TagRepository tagRepository;

	private final ElasticService elasticService;

	@Lazy
	@Autowired
	public PostService(PostRepository postRepository, CommentService commentService,
			PostReactionService postReactionService, UserRepository userRepository, TagRepository tagRepository,
			PostVersionRepository postVersionRepository, ElasticService elasticService) {
		this.postRepository = postRepository;
		this.commentService = commentService;
		this.postReactionService = postReactionService;
		this.userRepository = userRepository;
		this.tagRepository = tagRepository;
		this.postVersionRepository = postVersionRepository;
		this.elasticService = elasticService;
	}

	public PostDetailsDto getPostById(UUID id) {
		var post = postRepository.findById(id).map(PostMapper.MAPPER::postToPostDetailsDto).orElseThrow();

		var comments = commentService.findAllByPostId(id);
		post.setComments(comments);

		post.setRating(postReactionService.calcPostRatingById(id));

		return post;
	}

	public List<PostsListDetailsDto> getAllPosts(Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		return postRepository.getAllPosts(pageable).stream()
				.map(post -> PostsListDetailsDto.fromEntity(post, postRepository.getAllReactionsOnPost(post.getId())))
				.collect(Collectors.toList());
	}

	public List<PostsListDetailsDto> getHotPosts(Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		return postRepository.getHotPosts(pageable).stream()
			.map(post -> PostsListDetailsDto.fromEntity(post, postRepository.getAllReactionsOnPost(post.getId())))
			.collect(Collectors.toList());
	}

	public List<PostsListDetailsDto> getBestPosts(Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		return postRepository.getBestPosts(pageable).stream()
			.map(post -> PostsListDetailsDto.fromEntity(post, postRepository.getAllReactionsOnPost(post.getId())))
			.collect(Collectors.toList());
	}

	public List<PostsListDetailsDto> getPostsByTags(String tagQuery, Integer from, Integer count) {
		List<String> tags = List.of(tagQuery.split("\\+"));
		var pageable = PageRequest.of(from / count, count);
		return postRepository.getPostsByTags(tags, tags.size(), pageable).stream()
			.map(post -> PostsListDetailsDto.fromEntity(post, postRepository.getAllReactionsOnPost(post.getId())))
			.collect(Collectors.toList());
	}

	public UUID editPost(EditPostDto editPostDto) {
		var currentPost = postRepository.getOne(editPostDto.getPostId());
		if (!editPostDto.getDraft()) {
			var postVersion = PostMapper.MAPPER.postToPostVersion(currentPost);
			postVersion.setAuthor(userRepository.findById(editPostDto.getEditorId()).orElseThrow());
			postVersionRepository.save(postVersion);
		}
		currentPost.setTitle(editPostDto.getTitle());
		currentPost.setText(editPostDto.getText());
		currentPost.setMarkdown(editPostDto.getMarkdown());
		currentPost.setCoverImage(editPostDto.getCoverImage());
		currentPost.setDraft(editPostDto.getDraft());
		currentPost.setTags(new HashSet<>(tagRepository.findAllById(editPostDto.getTags())));

		return postRepository.save(currentPost).getId();
	}

	public UUID savePost(CreatePostDto createPostDto) {
		var post = PostMapper.MAPPER.createPostDtoToPost(createPostDto);
		var tags = new HashSet<>(tagRepository.findAllById(createPostDto.getTags()));
		post.setTags(tags);
		var savedPost = postRepository.save(post);
		postReactionService
				.setReaction(new ReceivedPostReactionDto(savedPost.getId(), createPostDto.getAuthor(), true));
		if (!savedPost.getDraft()) {
			elasticService.put(savedPost);
		}
		return savedPost.getId();
	}

	public String getTitleOfPost(UUID id) {
		return postRepository.getTitleById(id);
	}

	public List<DraftsListDto> getAllDrafts(UUID userId) {
		return postRepository.getDraftsByUser(userId).stream().map(PostMapper.MAPPER::postToDraftDto)
				.collect(Collectors.toList());
	}
}
