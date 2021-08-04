package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("post")
@Validated
public class PostController {

	private final PostService postService;

	@Autowired
	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping("/{id}")
	public PostDetailsDto getPost(@PathVariable UUID id) {
		return postService.getPostById(id);
	}

}