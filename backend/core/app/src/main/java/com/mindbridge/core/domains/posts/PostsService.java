package com.mindbridge.core.domains.posts;

import com.mindbridge.core.domains.posts.dto.PostsListDetailsDto;
import com.mindbridge.data.domains.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostsService {
	@Autowired
	PostRepository postRepository;

	public List<PostsListDetailsDto> getAllPosts() {
		return postRepository
				.getAllPosts(PageRequest.of(0, 10))
				.stream()
				.map(post -> PostsListDetailsDto.fromEntity(post, postRepository.getAllReactionsOnPost(post.getId())))
				.collect(Collectors.toList());
	}
}
