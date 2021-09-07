package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.core.domains.comment.dto.CreateCommentDto;
import com.mindbridge.core.domains.comment.dto.EditCommentDto;
import com.mindbridge.core.domains.comment.dto.ReplyCommentDto;
import com.mindbridge.data.domains.comment.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentMapper {

	CommentMapper MAPPER = Mappers.getMapper(CommentMapper.class);

	@Mapping(target = "rating", ignore = true)
	CommentDto commentToCommentDto(Comment comment);

	@Mapping(source = "author", target = "author.id")
	@Mapping(source = "nickname", target = "author.nickname")
	@Mapping(source = "postId", target = "post.id")
	@Mapping(source = "avatar", target = "author.avatar")
	@Mapping(ignore = true, target = "reactions")
	Comment createCommentDtoToComment(CreateCommentDto createCommentDto);

	@Mapping(source = "author", target = "author.id")
	@Mapping(source = "postId", target = "post.id")
	@Mapping(source = "replyCommentId", target = "comment.id")
	@Mapping(source = "nickname", target = "author.nickname")
	@Mapping(source = "avatar", target = "author.avatar")
	Comment replyToCommentDtoToComment(ReplyCommentDto replyCommentDto);

}
