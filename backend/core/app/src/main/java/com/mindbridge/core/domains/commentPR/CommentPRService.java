package com.mindbridge.core.domains.commentPR;

import com.mindbridge.core.domains.commentPR.dto.CreateCommentPrDto;
import com.mindbridge.core.domains.commentPR.dto.EditPrCommentDto;
import com.mindbridge.core.domains.postPR.dto.CommentPrDto;
import com.mindbridge.data.domains.PRComment.PRCommentRepository;
import com.mindbridge.data.domains.PRComment.model.PRComment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CommentPRService {

	private final PRCommentRepository commentRepository;

	@Lazy
	@Autowired
	public CommentPRService(PRCommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}

	public PRComment addCommentToPr(CreateCommentPrDto prComment) {
		var commentToDto = CommentPRMapper.MAPPER.createCommentPrDtoToComment(prComment);
		return commentRepository.save(commentToDto);
	}

    public CommentPrDto editPrComment(EditPrCommentDto editPrCommentDto) {
		var comment = commentRepository.getOne(editPrCommentDto.getPrCommentId());
		comment.setText(editPrCommentDto.getText());
		var savePrComment = commentRepository.save(comment);
		return CommentPRMapper.MAPPER.commentPrToCommentDto(savePrComment);
    }
}
