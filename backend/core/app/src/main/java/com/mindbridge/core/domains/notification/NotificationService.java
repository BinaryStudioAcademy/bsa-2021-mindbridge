package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.NotificationDto;
import com.mindbridge.data.domains.notification.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NotificationService {

	private final NotificationRepository notificationRepository;

	@Lazy
	@Autowired
	public NotificationService(NotificationRepository notificationRepository) {
		this.notificationRepository = notificationRepository;
	}

	public long getNotificationCount(UUID userId) {
		return notificationRepository.calcUnreadNotifications(userId);
	}

	public List<NotificationDto> getNotificationList(UUID userId) {
		return notificationRepository.getNotificationList(userId).stream()
				.map(NotificationMapper.MAPPER::notificationToNotificationDto).collect(Collectors.toList());
	}

}
