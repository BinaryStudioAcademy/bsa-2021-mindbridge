package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.core.domains.comment.dto.CreateCommentDto;
import com.mindbridge.core.domains.comment.dto.ReplyCommentDto;
import com.mindbridge.core.domains.notification.NotificationService;
import com.mindbridge.core.domains.post.PostService;
import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.data.domains.comment.CommentRepository;
import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.commentReaction.CommentReactionRepository;
import com.mindbridge.data.domains.notification.model.Notification;
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

	private final NotificationService notificationService;

	private final PostService postService;

	private final UserService userService;

	@Lazy
	@Autowired
	public CommentService(CommentRepository commentRepository, CommentReactionRepository commentReactionRepository,
						  NotificationService notificationService, PostService postService, UserService userService) {
		this.commentRepository = commentRepository;
		this.commentReactionRepository = commentReactionRepository;
		this.notificationService = notificationService;
		this.postService = postService;
		this.userService = userService;
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
		notificationService.createNotification(
			postService.getPostById(comment.getPostId()).getAuthor().getId(),
			userService.getUserById(comment.getAuthor()).getNickname(),
			comment.getPostId(),
			Notification.Type.newComment);
		return commentRepository.save(commentToDto);
	}

	public Comment addReplyToComment(ReplyCommentDto reply) {
		var commentDtoToReply = CommentMapper.MAPPER.replyToCommentDtoToComment(reply);
		notificationService.createNotification(
			getCommentById(reply.getReplyCommentId()).getAuthor().getId(),
			reply.getNickname(),
			reply.getPostId(),
			Notification.Type.newReply);
		return commentRepository.save(commentDtoToReply);
	}

	public CommentDto getCommentById(UUID id) {
		var comment = commentRepository.findById(id).map(CommentMapper.MAPPER::commentToCommentDto).orElseThrow();
		return comment;
	}

}
