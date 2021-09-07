package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.CreatePostDto;
import com.mindbridge.core.domains.post.dto.DraftsListDto;
import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.core.domains.post.dto.RelatedPostDto;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.postVersion.model.PostVersion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostMapper {

	PostMapper MAPPER = Mappers.getMapper(PostMapper.class);

	@Mapping(target = "comments", ignore = true)
	@Mapping(target = "rating", ignore = true)
	@Mapping(target = "isFavourite", ignore = true)
	@Mapping(target = "postViewsNumber", ignore = true)
	PostDetailsDto postToPostDetailsDto(Post post);

	RelatedPostDto postToRelatedPostDto(Post post);

	@Mapping(source = "author", target = "author.id")
	@Mapping(target = "tags", ignore = true)
	Post createPostDtoToPost(CreatePostDto createPostDto);

	@Mapping(source = "id", target = "post.id")
	PostVersion postToPostVersion(Post post);

	DraftsListDto postToDraftDto(Post post);

}
