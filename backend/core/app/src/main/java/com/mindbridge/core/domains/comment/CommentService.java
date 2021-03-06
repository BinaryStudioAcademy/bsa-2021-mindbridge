package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.achievement.AchievementHelper;
import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.core.domains.comment.dto.CreateCommentDto;
import com.mindbridge.core.domains.comment.dto.EditCommentDto;
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
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommentService {

	private final CommentRepository commentRepository;

	private final CommentReactionRepository commentReactionRepository;

	private final NotificationService notificationService;

	private final PostService postService;

	private final UserService userService;

	private final AchievementHelper achievementHelper;

	@Lazy
	@Autowired
	public CommentService(CommentRepository commentRepository, CommentReactionRepository commentReactionRepository,
						  NotificationService notificationService, PostService postService, UserService userService, AchievementHelper achievementHelper) {
		this.commentRepository = commentRepository;
		this.commentReactionRepository = commentReactionRepository;
		this.notificationService = notificationService;
		this.postService = postService;
		this.userService = userService;
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

		var authorPostId = postService.getPostById(null, comment.getPostId()).getAuthor().getId();
		if (!authorPostId.equals(comment.getAuthor())) {
			notificationService.createNotification(
				authorPostId,
				userService.getUserById(comment.getAuthor()).getNickname(),
				result.getId(),
				Notification.Type.newComment);
		}

		var IDs = findMentionsAtString(comment.getText());
		for (UUID id: IDs) {
			if (!result.getAuthor().getId().equals(id)) {
				notificationService.createNotification(
					id,
					comment.getNickname(),
					result.getId(),
					Notification.Type.newMention
				);
			}
		}

		achievementHelper.checkCommentsCount(commentToDto.getAuthor());
		return result;
	}

	public Comment addReplyToComment(ReplyCommentDto reply) {
		var commentDtoToReply = CommentMapper.MAPPER.replyToCommentDtoToComment(reply);
		var IDs = findMentionsAtString(reply.getText());
		var comment = commentRepository.save(commentDtoToReply);

		notificationService.createNotification(
			getCommentById(reply.getReplyCommentId()).getAuthor().getId(),
			reply.getNickname(),
			comment.getId(),
			Notification.Type.newReply);

		for (UUID id: IDs) {
			if (!comment.getAuthor().getId().equals(id)) {
				notificationService.createNotification(
					id,
					reply.getNickname(),
					comment.getId(),
					Notification.Type.newMention
				);
			}
		}

		return comment;
	}

	public CommentDto getCommentById(UUID id) {
		return commentRepository.findById(id).map(CommentMapper.MAPPER::commentToCommentDto).orElseThrow();
	}

	public List<UUID> findMentionsAtString(String text) {
		Pattern pattern = Pattern.compile("\\((.*?)\\)");
		Matcher matcher = pattern.matcher(text);
		List<UUID> IDs = new ArrayList<>();
		while ( matcher.find() ) {
			try {
				UUID id = UUID.fromString(matcher.group(1));
				IDs.add(id);
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			}
		}
		return IDs;
	}

    public CommentDto editComment(EditCommentDto editComment) {
		var comment = commentRepository.getOne(editComment.getCommentId());
		comment.setText(editComment.getText());
		var saveComment = commentRepository.save(comment);
		return CommentMapper.MAPPER.commentToCommentDto(saveComment);
    }

}
