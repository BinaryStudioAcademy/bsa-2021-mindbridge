package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.achievement.AchievementHelper;
import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.core.domains.comment.dto.CreateCommentDto;
import com.mindbridge.core.domains.comment.dto.EditCommentDto;
import com.mindbridge.core.domains.comment.dto.ReplyCommentDto;
import com.mindbridge.data.domains.comment.CommentRepository;
import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.commentReaction.CommentReactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommentService {

	private final CommentRepository commentRepository;

	private final CommentReactionRepository commentReactionRepository;

	private final AchievementHelper achievementHelper;

	@Lazy
	@Autowired
	public CommentService(CommentRepository commentRepository, CommentReactionRepository commentReactionRepository,
		AchievementHelper achievementHelper) {
		this.commentRepository = commentRepository;
		this.commentReactionRepository = commentReactionRepository;
		this.achievementHelper = achievementHelper;
	}

	public List<CommentDto> findAllByPostId(UUID id) {
		var comments = commentRepository.findAllByPostId(id).stream().map(CommentMapper.MAPPER::commentToCommentDto)
				.collect(Collectors.toList());

		comments = calcRatingForAll(comments);
		return comments;
	}

	public List<CommentDto> calcRatingForAll(List<CommentDto> comments) {
		comments.forEach(comment -> {
			comment.setRating(commentReactionRepository.calcCommentRating(comment.getId()));
			if (!comment.getComments().isEmpty()) {
				comment.setComments(calcRatingForAll(comment.getComments()));
			}
		});
		return comments;
	}

	public Comment addComment(CreateCommentDto comment) {
		var commentToDto = CommentMapper.MAPPER.createCommentDtoToComment(comment);
		Comment result = commentRepository.save(commentToDto);
		achievementHelper.checkCommentsCount(commentToDto.getAuthor());
		return result;
	}

	public Comment addReplyToComment(ReplyCommentDto reply) {
		var commentDtoToReply = CommentMapper.MAPPER.replyToCommentDtoToComment(reply);
		return commentRepository.save(commentDtoToReply);
	}

	public CommentDto getCommentById(UUID id) {
		var comment = commentRepository.findById(id).map(CommentMapper.MAPPER::commentToCommentDto).orElseThrow();
		return comment;
	}

    public CommentDto editComment(EditCommentDto editComment) {
		var comment = commentRepository.getOne(editComment.getCommentId());
		comment.setText(editComment.getText());
		var saveComment = commentRepository.save(comment);
		return CommentMapper.MAPPER.commentToCommentDto(saveComment);
    }
}
