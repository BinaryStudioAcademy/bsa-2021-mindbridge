package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.PostDto;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.dto.TagDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostsService {
	@Autowired
	PostRepository postRepository;

	public List<PostDto> getAllPosts() {
//		System.out.println(postRepository.getAllPosts());
		return postRepository
				.getAllPosts()
				.stream()
				.map(PostDto::fromEntity)
				.collect(Collectors.toList());
	}
}
