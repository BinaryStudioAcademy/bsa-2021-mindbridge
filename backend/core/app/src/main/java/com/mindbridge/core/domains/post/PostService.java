package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.core.domains.postReaction.PostReactionService;
import com.mindbridge.data.domains.comment.CommentRepository;
import com.mindbridge.data.domains.post.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class PostService {

	private final PostRepository postRepository;

	private final CommentService commentService;

	private final PostReactionService postReactionService;

	@Lazy
	@Autowired
	public PostService(PostRepository postRepository, CommentService commentService,
			PostReactionService postReactionService) {
		this.postRepository = postRepository;
		this.commentService = commentService;
		this.postReactionService = postReactionService;
	}

	public PostDetailsDto getPostById(UUID id) {
		var post = postRepository.findById(id).map(PostMapper.MAPPER::postToPostDetailsDto).orElseThrow();

		var comments = commentService.findAllByPostId(id);
		post.setComments(comments);

		post.setRating(postReactionService.calcPostRatingById(id));

		return post;
	}

}
