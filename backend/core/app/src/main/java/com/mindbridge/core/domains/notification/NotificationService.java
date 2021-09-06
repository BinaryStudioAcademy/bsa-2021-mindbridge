package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.CreateNotificationDto;
import com.mindbridge.core.domains.notification.dto.NotificationDto;
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

	@Lazy
	@Autowired
	public NotificationService(NotificationRepository notificationRepository, SimpMessagingTemplate template) {
		this.notificationRepository = notificationRepository;
		this.template = template;
	}

	public long getNotificationCount(UUID userId) {
		return notificationRepository.calcUnreadNotifications(userId);
	}

	public void createNotification(UUID receiverId, String authorNickname, UUID sourceId, Notification.Type type) {
		CreateNotificationDto createNotificationDto = new CreateNotificationDto();
		createNotificationDto.setSourceId(sourceId);
		createNotificationDto.setReceiverId(receiverId);
		String description = null;
		String destination;
		switch (type) {
			case newPR: {
				description = authorNickname + " has contributed to your post";
				destination = "newPR";
				createNotificationDto.setType("newPR");
				break;
			}
			case newPost: {
				description = authorNickname + " has published a new post";
				destination = "newPost";
				createNotificationDto.setType("newPost");
				break;
			}
			case newFollower: {
				description = authorNickname + " now follows you";
				destination = "newFollower";
				createNotificationDto.setType("newFollower");
				break;
			}
			case PRClosed: {
				description = authorNickname + " closed your pull request";
				destination = "PRClosed";
				createNotificationDto.setType("PRClosed");
				break;
			}
			case PRAccepted: {
				description = authorNickname + " accepted your pull request";
				destination = "PRAccepted";
				createNotificationDto.setType("PRAccepted");
				break;
			}
			case newComment: {
				description = authorNickname + " commented your post";
				destination = "newComment";
				createNotificationDto.setType("newComment");
				break;
			}
			case newReply: {
				description = authorNickname + " replied on your comment";
				destination = "newReply";
				createNotificationDto.setType("newReply");
				break;
			}
			case newMention: {
				description = authorNickname + " mentioned you in comment";
				destination = "newMention";
				createNotificationDto.setType("newMention");
				break;
			}
			default: {
				return;
			}
		}
		createNotificationDto.setText(description);
		notificationRepository.save(NotificationMapper.MAPPER.createDtoToNotification(createNotificationDto));

		template.convertAndSendToUser(receiverId.toString(), destination, description);
	}

	public List<NotificationDto> getNotificationList(UUID userId, Boolean onlyUnread, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		if (onlyUnread) {
			return notificationRepository.getUnreadNotificationList(userId, pageable).stream()
					.map(NotificationMapper.MAPPER::notificationToNotificationDto).collect(Collectors.toList());
		}
		else {
			return notificationRepository.getNotificationList(userId, pageable).stream()
					.map(NotificationMapper.MAPPER::notificationToNotificationDto).collect(Collectors.toList());
		}
	}

	public void toggleNotificationRead(UUID id) {
		notificationRepository.toggleNotificationRead(id);
	}

	public void readAll(UUID id) {
		notificationRepository.readAll(id);
	}

}
