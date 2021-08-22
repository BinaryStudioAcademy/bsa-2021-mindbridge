package com.mindbridge.core.domains.postReaction;

import com.mindbridge.core.domains.postReaction.dto.ReceivedPostReactionDto;
import com.mindbridge.core.domains.postReaction.dto.ResponsePostReactionDto;
import com.mindbridge.data.domains.postReaction.model.PostReaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostReactionMapper {
	PostReactionMapper MAPPER = Mappers.getMapper( PostReactionMapper.class );

	@Mapping(source = "userId", target = "author.id")
	@Mapping(source = "postId", target = "post.id")
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "updatedAt", ignore = true)
	PostReaction dtoToPostReaction(ReceivedPostReactionDto postReactionDto);
}
