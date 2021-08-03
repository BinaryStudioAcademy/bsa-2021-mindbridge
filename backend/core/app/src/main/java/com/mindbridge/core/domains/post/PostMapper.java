package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.data.domains.post.dto.PostDetailsQueryResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostMapper {
	PostMapper MAPPER = Mappers.getMapper(PostMapper.class);

	@Mapping(target = "comments", ignore = true)
	public abstract PostDetailsDto postResultToPostDetailsDto(PostDetailsQueryResult post);

}
