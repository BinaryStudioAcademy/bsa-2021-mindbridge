package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.data.domains.post.model.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostMapper {

	PostMapper MAPPER = Mappers.getMapper(PostMapper.class);

	@Mapping(target = "comments", ignore = true)
	@Mapping(target = "rating", ignore = true)
	public abstract PostDetailsDto postToPostDetailsDto(Post post);

}
