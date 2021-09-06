package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.elasticsearch.ElasticService;
import com.mindbridge.core.domains.helpers.DateFormatter;
import com.mindbridge.core.domains.post.dto.*;
import com.mindbridge.core.domains.postReaction.PostReactionService;
import com.mindbridge.core.domains.postReaction.dto.ReceivedPostReactionDto;
import com.mindbridge.core.domains.tag.dto.TagDto;
import com.mindbridge.core.domains.user.UserMapper;
import com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult;
import com.mindbridge.data.domains.tag.dto.TagDataDto;
import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.data.domains.favorite.FavoriteRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.postVersion.PostVersionRepository;
import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.domains.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
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

	private final UserService userService;

	private final FavoriteRepository favouriteRepository;

	@Lazy
	@Autowired
	public PostService(PostRepository postRepository, CommentService commentService,
					   PostReactionService postReactionService, UserRepository userRepository, TagRepository tagRepository,
					   PostVersionRepository postVersionRepository, ElasticService elasticService, UserService userService,
					   FavoriteRepository favouriteRepository) {
		this.postRepository = postRepository;
		this.commentService = commentService;
		this.postReactionService = postReactionService;
		this.userRepository = userRepository;
		this.tagRepository = tagRepository;
		this.postVersionRepository = postVersionRepository;
		this.elasticService = elasticService;
		this.userService = userService;
		this.favouriteRepository = favouriteRepository;
	}

	public PostDetailsDto getPostById(UUID id) {
		var post = postRepository.findById(id);
		var postDetailsDto = post.map(PostMapper.MAPPER::postToPostDetailsDto).orElseThrow();

		postDetailsDto.setAuthor(userService.setUserStatInformation(UserMapper.MAPPER.userToUserDto(post.orElseThrow().getAuthor()).getId()));

		List<String> tags = postDetailsDto.getTags().stream().map(TagDto::getName).collect(Collectors.toList());
		List<RelatedPostDto> relatedPostsDto = postRepository.getRelatedPostsByTags(id, tags, PageRequest.of(0, 3))
			.stream()
			.map(PostMapper.MAPPER::postToRelatedPostDto)
			.collect(Collectors.toList());

		relatedPostsDto.forEach(p -> p.setRating(postReactionService.calcPostRatingById(p.getId())));
		relatedPostsDto.sort(Comparator.comparingLong(RelatedPostDto::getRating).reversed());

		var comments = commentService.findAllByPostId(id);
		postDetailsDto.setComments(comments);

		postDetailsDto.setRating(postReactionService.calcPostRatingById(id));
		postDetailsDto.setRelatedPosts(relatedPostsDto);

		var favourite = favouriteRepository.getFavoriteByPostId(id);
		postDetailsDto.setIsFavourite(favourite.isPresent());

		return postDetailsDto;
	}

	public List<PostsListDetailsDto> getAllPosts(Integer from, Integer count, UUID userId) {
		var pageable = PageRequest.of(from / count, count);
		return postRepository.getAllPosts(pageable).stream().map(this::mapPost).collect(Collectors.toList());
	}

	public PostsListDetailsDto mapPost(Post post) {
		var postListDto = PostMapper.MAPPER.postToPostsListDto(post);
		postListDto.setAuthor(userService.setUserStatInformation(post.getAuthor().getId()));
		postListDto.setCommentsCount(post.getComments().size());
		postListDto.setTags(post.getTags().stream().map(TagDataDto::fromEntity).collect(Collectors.toList()));
		PostsReactionsQueryResult postsReactionsQueryResult = postRepository.getAllReactionsOnPost(post.getId());
		postListDto.setLikesCount(postsReactionsQueryResult.likeCount);
		postListDto.setDisLikesCount(postsReactionsQueryResult.disLikeCount);
		postListDto.setPostRating(postsReactionsQueryResult.likeCount - postsReactionsQueryResult.disLikeCount);
		postListDto.setCreatedAt(DateFormatter.getDate(post.getCreatedAt(), "dd MMMM"));
		var favourite = favouriteRepository.getFavoriteByPostId(postListDto.getId());
		postListDto.setIsFavourite(favourite.isPresent());
		return postListDto;
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

	public List<PostsListDetailsDto> listIDsToListPosts(List<UUID> postIds) {
		return postRepository.findAllById(postIds).stream().map(this::mapPost).collect(Collectors.toList());
	}

}
