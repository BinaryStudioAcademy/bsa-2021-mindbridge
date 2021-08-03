package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.post.dto.PostDetailsDto;
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

	@Lazy
	@Autowired
	public PostService(PostRepository postRepository, CommentService commentService) {
		this.postRepository = postRepository;
		this.commentService = commentService;
	}

	public PostDetailsDto getPostById(UUID id) {
		var post = postRepository.findPostById(id)
			.map(PostMapper.MAPPER::postResultToPostDetailsDto)
			.orElse(null);

		var comments = commentService.findAllByPostId(id);
		post.setComments(comments);

		return post;
	}
}
