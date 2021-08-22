package com.mindbridge.core.domains.post.dto;

import com.mindbridge.data.domains.postVersion.model.PostVersion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostVersionMapper {

	PostVersionMapper MAPPER = Mappers.getMapper(PostVersionMapper.class);

	@Mapping(target = "post", ignore = true)
	PostVersionDetailsDto PostVersionToPostVersionDetailsDto(PostVersion postVersion);

	@Mapping(target = "post", ignore = true)
	PostVersionDetailsDto PostVersionToPreLastPostVersionDetailsDto(PostVersion postVersion);

}
