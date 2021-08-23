package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRDetailsDto;
import com.mindbridge.core.domains.postPR.dto.PostPRListDto;
import com.mindbridge.data.domains.postPR.model.PostPR;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostPRMapper {

	PostPRMapper MAPPER = Mappers.getMapper(PostPRMapper.class);

	@Mapping(source = "postId", target = "post.id")
	@Mapping(source = "contributorId", target = "contributor.id")
	@Mapping(target = "closed", constant = "false")
	@Mapping(target = "tags", ignore = true)
	PostPR createPostPRDtoToPostPr(CreatePostPRDto createPostPRDto);

	PostPRDetailsDto postPRToPostPRDetailsDto(PostPR postPR);

	@Mapping(source = "contributor", target = "author")
	PostPRListDto postPRToPostPRList(PostPR postPR);

}
