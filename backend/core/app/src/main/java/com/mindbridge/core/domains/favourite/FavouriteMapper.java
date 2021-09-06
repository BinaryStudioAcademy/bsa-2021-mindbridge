package com.mindbridge.core.domains.favourite;

import com.mindbridge.core.domains.favourite.dto.CreateFavouriteDto;
import com.mindbridge.data.domains.favorite.model.Favorite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FavouriteMapper {
	FavouriteMapper MAPPER = Mappers.getMapper(FavouriteMapper.class);

	@Mapping(source = "userId", target = "user.id")
	@Mapping(source = "postId", target = "post.id")
	Favorite createFavouriteDtoToFavourite(CreateFavouriteDto favouriteDto);
}
