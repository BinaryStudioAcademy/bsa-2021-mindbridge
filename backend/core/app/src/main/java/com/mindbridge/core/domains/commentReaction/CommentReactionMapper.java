package com.mindbridge.core.domains.commentReaction;

import com.mindbridge.core.domains.commentReaction.dto.ReceivedCommentReactionDto;
import com.mindbridge.data.domains.commentReaction.model.CommentReaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentReactionMapper {

	CommentReactionMapper MAPPER = Mappers.getMapper(CommentReactionMapper.class);

	@Mapping(source = "userId", target = "author.id")
	@Mapping(source = "commentId", target = "comment.id")
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "updatedAt", ignore = true)
	CommentReaction dtoToPosReaction(ReceivedCommentReactionDto commentReactionDto);

}
