package com.mindbridge.core.domains.favourite;

import com.mindbridge.core.domains.post.dto.PostsListDetailsDto;
import com.mindbridge.data.domains.favorite.FavoriteRepository;
import com.mindbridge.data.domains.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Lazy;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FavouriteService {

	private final FavoriteRepository favouriteRepository;

	private final PostRepository postRepository;

	@Autowired
	@Lazy
	public FavouriteService(FavoriteRepository favouriteRepository, PostRepository postRepository) {
		this.favouriteRepository = favouriteRepository;
		this.postRepository = postRepository;
	}

	public PostsListDetailsDto getFavouritesPostByUserId(UUID id, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		favouriteRepository.findAll();
//		return favouriteRepository.getAllByUserId(id, pageable).stream()
//			.map(favorite -> PostsListDetailsDto.fromEntity(favorite.getPost(), postRepository.getAllReactionsOnPost(favorite.getPost().getId())))
//			.collect(Collectors.toList());
	}


}
