package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.commentPR.CommentPRService;
import com.mindbridge.core.domains.notification.dto.CreateNotificationDto;
import com.mindbridge.core.domains.notification.dto.NotificationDto;
import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.notification.NotificationRepository;
import com.mindbridge.data.domains.notification.model.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NotificationService {

	private final NotificationRepository notificationRepository;

	private final SimpMessagingTemplate template;

	private final UserService userService;

	private final FollowerRepository followerRepository;

	private final CommentService commentService;

	private final CommentPRService commentPRService;

	@Lazy
	@Autowired
	public NotificationService(NotificationRepository notificationRepository, SimpMessagingTemplate template, CommentPRService commentPRService,
							   UserService userService, FollowerRepository followerRepository, CommentService commentService) {
		this.notificationRepository = notificationRepository;
		this.template = template;
		this.userService = userService;
		this.followerRepository = followerRepository;
		this.commentService = commentService;
		this.commentPRService = commentPRService;
	}

	public long getNotificationCount(UUID userId) {
		return notificationRepository.calcUnreadNotifications(userId);
	}

	public boolean createNotification(UUID receiverId, String authorNicknameOrAwardTitle, UUID sourceId, Notification.Type type) {
		CreateNotificationDto createNotificationDto = new CreateNotificationDto();
		createNotificationDto.setSourceId(sourceId);
		createNotificationDto.setReceiverId(receiverId);
		String description = null;
		String destination;
		switch (type) {
			case newPR: {
				description = authorNicknameOrAwardTitle + " has contributed to your post";
				destination = "newPR";
				createNotificationDto.setType("newPR");
				break;
			}
			case newPost: {
				description = authorNicknameOrAwardTitle + " has published a new post";
				destination = "newPost";
				createNotificationDto.setType("newPost");
				break;
			}
			case newFollower: {
				description = authorNicknameOrAwardTitle + " now follows you";
				destination = "newFollower";
				createNotificationDto.setType("newFollower");
				break;
			}
			case PRClosed: {
				description = authorNicknameOrAwardTitle + " closed your pull request";
				destination = "PRClosed";
				createNotificationDto.setType("PRClosed");
				break;
			}
			case PRAccepted: {
				description = authorNicknameOrAwardTitle + " accepted your pull request";
				destination = "PRAccepted";
				createNotificationDto.setType("PRAccepted");
				break;
			}
			case newComment: {
				description = authorNicknameOrAwardTitle + " commented your post";
				destination = "newComment";
				createNotificationDto.setType("newComment");
				break;
			}
			case newReply: {
				description = authorNicknameOrAwardTitle + " replied on your comment";
				destination = "newReply";
				createNotificationDto.setType("newReply");
				break;
			}
			case newMention: {
				description = authorNicknameOrAwardTitle + " mentioned you in comment";
				destination = "newMention";
				createNotificationDto.setType("newMention");
				break;
			}
			case newAchievement: {
				description = "Congratulations! You get a new award. "
				+ "\"" + authorNicknameOrAwardTitle + "\"";
				destination = "newAchievement";
				createNotificationDto.setType("newAchievement");
				break;
			}
			case newPRComment: {
				description = authorNicknameOrAwardTitle + " commented your pull request";
				destination = "newPRComment";
				createNotificationDto.setType("newPRComment");
				break;
			}
			default: {
				return false;
			}
		}
		createNotificationDto.setText(description);
		notificationRepository.save(NotificationMapper.MAPPER.createDtoToNotification(createNotificationDto));

		template.convertAndSendToUser(
			receiverId.toString(),
			destination,
			description
		);
		return true;
	}

	public void sendFollowersNewPost(UUID authorId, UUID postId) {
		var author = userService.getUserById(authorId);
		var followers = followerRepository.getAllFollowers(authorId);
		followers.stream().map(follower -> createNotification(
			follower.getFollower().getId(),
			author.getNickname(),
			postId,
			Notification.Type.newPost)).collect(Collectors.toList());
	}

	public List<NotificationDto> getNotificationList(UUID userId, Boolean onlyUnread, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		List<NotificationDto> list;
		if (onlyUnread) {
			list = notificationRepository.getUnreadNotificationList(userId, pageable).stream()
				.map(NotificationMapper.MAPPER::notificationToNotificationDto).collect(Collectors.toList());
		} else {
			list = notificationRepository.getNotificationList(userId, pageable).stream()
				.map(NotificationMapper.MAPPER::notificationToNotificationDto).collect(Collectors.toList());
		}
		for (NotificationDto notif : list) {
			if (notif.getType().equals("newReply") || notif.getType().equals("newComment") || notif.getType().equals("newMention")) {
				notif.setSourceId(commentService.getCommentById(UUID.fromString(notif.getSourceId())).getPostId().toString() + "#" + notif.getSourceId());
			}
			if (notif.getType().equals("newPRComment")) {
				notif.setSourceId(commentPRService.getCommentPR(UUID.fromString(notif.getSourceId())).getPrId().toString() + "#" + notif.getSourceId());
			}
		}

		return list;
	}

	public void toggleNotificationRead(UUID id) {
		notificationRepository.toggleNotificationRead(id);
	}

	public void readAll(UUID id) {
		notificationRepository.readAll(id);
	}

}
