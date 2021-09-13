package com.mindbridge.core.domains.commentPR;

import com.mindbridge.core.domains.commentPR.dto.CreateCommentPrDto;
import com.mindbridge.core.domains.commentPR.dto.EditPrCommentDto;
import com.mindbridge.core.domains.notification.NotificationService;
import com.mindbridge.core.domains.postPR.PostPRService;
import com.mindbridge.core.domains.postPR.dto.CommentPrDto;
import com.mindbridge.data.domains.PRComment.PRCommentRepository;
import com.mindbridge.data.domains.PRComment.model.PRComment;
import com.mindbridge.data.domains.notification.model.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class CommentPRService {

	private final PRCommentRepository commentRepository;

	private final PostPRService postPRService;

	private final NotificationService notificationService;

	@Lazy
	@Autowired
	public CommentPRService(PRCommentRepository commentRepository, PostPRService postPRService, NotificationService notificationService) {
		this.commentRepository = commentRepository;
		this.postPRService = postPRService;
		this.notificationService = notificationService;
	}

	public PRComment addCommentToPr(CreateCommentPrDto prComment) {
		var commentToDto = CommentPRMapper.MAPPER.createCommentPrDtoToComment(prComment);
		var comment = commentRepository.save(commentToDto);

		var authorPRId = postPRService.getPR(prComment.getPrId()).getContributor().getId();
		if (!authorPRId.equals(prComment.getAuthor())) {
			notificationService.createNotification(
				authorPRId,
				prComment.getNickname(),
				comment.getId(),
				Notification.Type.newPRComment);
		}

		return comment;
	}

    public CommentPrDto editPrComment(EditPrCommentDto editPrCommentDto) {
		var comment = commentRepository.getOne(editPrCommentDto.getPrCommentId());
		comment.setText(editPrCommentDto.getText());
		var savePrComment = commentRepository.save(comment);
		return CommentPRMapper.MAPPER.commentPrToCommentDto(savePrComment);
    }

    public CommentPrDto getCommentPR(UUID id) {
		return CommentPRMapper.MAPPER.commentPrToCommentDto(commentRepository.findById(id).orElseThrow());
	}
}
