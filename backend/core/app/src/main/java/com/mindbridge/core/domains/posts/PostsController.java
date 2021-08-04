package com.mindbridge.core.domains.posts;

import com.mindbridge.core.domains.posts.dto.PostsListDetailsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostsController {
	@Autowired
	PostsService postsService;

	@GetMapping("/all")
	public List<PostsListDetailsDto> printAllPosts() {
		return postsService.getAllPosts();
	}
}
