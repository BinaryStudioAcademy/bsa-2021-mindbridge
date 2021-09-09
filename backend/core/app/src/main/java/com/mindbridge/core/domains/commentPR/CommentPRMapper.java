package com.mindbridge.core.domains.commentPR;

import com.mindbridge.core.domains.commentPR.dto.CreateCommentPrDto;
import com.mindbridge.core.domains.postPR.dto.CommentPrDto;
import com.mindbridge.data.domains.PRComment.model.PRComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentPRMapper {

	CommentPRMapper MAPPER = Mappers.getMapper(CommentPRMapper.class);

	@Mapping(source = "author", target = "author.id")
	@Mapping(source = "nickname", target = "author.nickname")
	@Mapping(source = "prId", target = "postPR.id")
	@Mapping(source = "avatar", target = "author.avatar")
	PRComment createCommentPrDtoToComment(CreateCommentPrDto commentPrDto);

    CommentPrDto commentPrToCommentDto(PRComment savePrComment);
}
