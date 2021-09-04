package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.*;
import com.mindbridge.core.domains.postVersion.dto.PostVersionsListDto;
import org.springframework.beans.factory.annotation.Autowired;
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
	public UUID createPost(@RequestBody CreatePostDto post) {
		return postService.savePost(post);
	}

	@PutMapping("/edit")
	public UUID editPost(@RequestBody EditPostDto editPostDto) {
		return postService.editPost(editPostDto);
	}

	@GetMapping("/all")
	public List<PostsListDetailsDto> getAllPosts(@RequestParam(defaultValue = "0") Integer from,
			@RequestParam(defaultValue = "10") Integer count) {
		return postService.getAllPosts(from, count);
	}

	@GetMapping("/title/{id}")
	public String getTitle(@PathVariable UUID id) {
		return postService.getTitleOfPost(id);
	}

	@GetMapping("/drafts/{id}")
	public List<DraftsListDto> getAllDrafts(@PathVariable UUID id) {
		return postService.getAllDrafts(id);
	}

	@GetMapping("/allMy/{id}")
	public List<DraftsListDto> getAllMy(@PathVariable UUID id) {
		return postService.getAllMyPosts(id);
	}
}
