package com.mindbridge.core.domains.post;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.post.dto.CreatePostDto;
import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.core.domains.post.dto.PostsListDetailsDto;
import com.mindbridge.core.domains.postReaction.PostReactionService;
import com.mindbridge.data.domains.comment.CommentRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.domains.user.UserRepository;
import java.util.HashSet;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostService {

	private final PostRepository postRepository;

	private final CommentService commentService;

	private final PostReactionService postReactionService;

	private final UserRepository userRepository;

	private final TagRepository tagRepository;

	@Lazy
	@Autowired
	public PostService(PostRepository postRepository, CommentService commentService,
			PostReactionService postReactionService, UserRepository userRepository, TagRepository tagRepository) {
		this.postRepository = postRepository;
		this.commentService = commentService;
		this.postReactionService = postReactionService;
		this.userRepository = userRepository;
		this.tagRepository = tagRepository;
	}

	public PostDetailsDto getPostById(UUID id) {
		var post = postRepository.findById(id).map(PostMapper.MAPPER::postToPostDetailsDto).orElseThrow();

		var comments = commentService.findAllByPostId(id);
		post.setComments(comments);

		post.setRating(postReactionService.calcPostRatingById(id));

		return post;
	}

	public void savePost(CreatePostDto post) {
		System.out.println(post);
		var user = userRepository.getOne(post.getAuthor());
		var tags = new HashSet<>(tagRepository.findAllById(post.getTags()));

		postRepository.save(CreatePostDto.toPost(post, user, tags));
	}

	public List<PostsListDetailsDto> getAllPosts() {

		return postRepository.getAllPosts(PageRequest.of(0, 10)).stream()
				.map(post -> PostsListDetailsDto.fromEntity(post, postRepository.getAllReactionsOnPost(post.getId())))
				.collect(Collectors.toList());
	}

}
