package com.mindbridge.core.domains.postVersion;

import com.mindbridge.core.domains.post.dto.PostVersionDetailsDto;
import com.mindbridge.core.domains.postVersion.dto.PostVersionsListDto;
import com.mindbridge.data.domains.postVersion.model.PostVersion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostVersionMapper {

	PostVersionMapper MAPPER = Mappers.getMapper(PostVersionMapper.class);

	PostVersionsListDto postVersionToPostVersionList(PostVersion postVersion);

	@Mapping(target = "post", ignore = true)
	PostVersionDetailsDto PostVersionToPostVersionDetailsDto(PostVersion postVersion);

	@Mapping(target = "post", ignore = true)
	PostVersionDetailsDto PostVersionToPreLastPostVersionDetailsDto(PostVersion postVersion);
}
