package com.mindbridge.core.domains.favourite;

import com.mindbridge.core.domains.favourite.dto.CreateFavouriteDto;
import com.mindbridge.core.domains.post.PostMapper;
import com.mindbridge.core.domains.post.dto.PostsListDetailsDto;
import com.mindbridge.data.domains.favorite.FavoriteRepository;
import com.mindbridge.data.domains.favorite.model.Favorite;
import com.mindbridge.data.domains.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Lazy;

import java.util.List;
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

	public List<PostsListDetailsDto> getFavouritesPostByUserId(UUID id, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		var favourites = favouriteRepository.getAllByUserId(id, pageable);
		return favourites
			.stream()
			.map(fav -> PostsListDetailsDto.fromEntity(fav.getPost(), postRepository.getAllReactionsOnPost(fav.getPost().getId())))
			.collect(Collectors.toList());
	}


    public UUID saveFavourite(CreateFavouriteDto favouriteDto) {
		var favouritePost = FavouriteMapper.MAPPER.createFavouriteDtoToFavourite(favouriteDto);
		var savedPostId = favouriteRepository.save(favouritePost);
		return savedPostId.getPost().getId();
    }

	public UUID deleteFavouritePosts(UUID id) {
		var post = favouriteRepository.getFavoriteByPostId(id);
		favouriteRepository.delete(post.orElseThrow());
		return id;
	}
}
