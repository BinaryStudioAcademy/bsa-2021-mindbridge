package com.mindbridge.core.domains.highlight;

import com.mindbridge.core.domains.highlight.dto.HighlightsDetailsDto;
import com.mindbridge.core.domains.highlight.dto.SavaHighlightDto;
import com.mindbridge.data.domains.highlight.model.Highlight;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HighlightMapper {

	HighlightMapper MAPPER = Mappers.getMapper(HighlightMapper.class);

	@Mapping(source = "authorId", target = "user.id")
	@Mapping(source = "postId", target = "post.id")
	Highlight saveHighlightDtoToHighlight(SavaHighlightDto savaHighlightDto);

	@Mapping(source = "user.id", target = "userId")
	@Mapping(source = "post.id", target = "postId")
	@Mapping(source = "post.title", target = "postTitle")
	HighlightsDetailsDto fromHighlightToHighlightDetailsDto(Highlight highlight);
}
