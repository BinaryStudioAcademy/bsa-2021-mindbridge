package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.PostDto;
import com.mindbridge.data.domains.post.model.Post;
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
	public List<PostDto> printAllPosts() {
		return postsService.getAllPosts();
	}
}
