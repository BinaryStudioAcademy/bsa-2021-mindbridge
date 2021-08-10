package com.mindbridge.core.domains.post;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.mindbridge.core.domains.post.dto.CreatePostDto;
import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.core.domains.post.dto.PostsListDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
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

	@PostMapping("/create")
	public void createPost(@RequestBody CreatePostDto post) {
		postService.savePost(post);
	}

	@GetMapping("/all")
	public List<PostsListDetailsDto> getAllPosts(@RequestParam(defaultValue = "0") Integer from,
			@RequestParam(defaultValue = "10") Integer count) {
		return postService.getAllPosts(from, count);
	}

}
