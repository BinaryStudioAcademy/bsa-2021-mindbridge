package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.CreateNotificationDto;
import com.mindbridge.core.domains.notification.dto.NotificationDto;
import com.mindbridge.data.domains.notification.NotificationRepository;
import com.mindbridge.data.domains.notification.model.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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

	public void createNotification(UUID receiverId, UUID sourceId, Notification.Type type) {
		CreateNotificationDto createNotificationDto = new CreateNotificationDto();
		createNotificationDto.setSourceId(sourceId);
		createNotificationDto.setReceiverId(receiverId);
		String description = null;
		String destination;
		switch (type) {
			case newPR: {
				description = "An offer has come to your post";
				destination = "newPR";
				createNotificationDto.setType("newPR");
				break;
			}
			case newPost: {
				description = "New post published";
				destination = "newPost";
				createNotificationDto.setType("newPost");
				break;
			}
			case newFollower: {
				description = "You have a new follower";
				destination = "newFollower";
				createNotificationDto.setType("newFollower");
				break;
			}
			default: {
				return;
			}
		}
		createNotificationDto.setText(description);
		notificationRepository.save(NotificationMapper.MAPPER.createDtoToNotification(createNotificationDto));

		template.convertAndSendToUser(
			receiverId.toString(),
			destination,
			description
		);
	}

	public List<NotificationDto> getNotificationList(UUID userId) {
		return notificationRepository.getNotificationList(userId).stream()
				.map(NotificationMapper.MAPPER::notificationToNotificationDto).collect(Collectors.toList());
	}

	public void markNotificationRead(UUID id) {
		notificationRepository.markNotificationRead(id);
	}

}
