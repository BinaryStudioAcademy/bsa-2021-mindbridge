package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.data.domains.comment.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentMapper {
	CommentMapper MAPPER = Mappers.getMapper(CommentMapper.class);

	public abstract CommentDto commentToCommentDto(Comment comment);
}
