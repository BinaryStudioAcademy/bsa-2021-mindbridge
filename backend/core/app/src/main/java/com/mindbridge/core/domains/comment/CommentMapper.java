package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.data.domains.comment.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentMapper {

	CommentMapper MAPPER = Mappers.getMapper(CommentMapper.class);

	@Mapping(target = "rating", ignore = true)
	public abstract CommentDto commentToCommentDto(Comment comment);

}
