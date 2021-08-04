package com.mindbridge.core.domains.posts;

import com.mindbridge.core.domains.posts.dto.PostDto;
import com.mindbridge.data.domains.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostsService {
	@Autowired
	PostRepository postRepository;

	public List<PostDto> getAllPosts() {
		return postRepository
				.getAllPosts()
				.stream()
				.map(post -> PostDto.fromEntity(post, postRepository.getAllReactionsOnPost(post.getId())))
				.collect(Collectors.toList());
	}
}
