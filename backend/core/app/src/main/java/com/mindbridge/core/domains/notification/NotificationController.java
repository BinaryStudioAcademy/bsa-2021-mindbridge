package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("notification")
@Validated
public class NotificationController {

	private final NotificationService notificationService;

	@Autowired
	public NotificationController(NotificationService notificationService) {
		this.notificationService = notificationService;
	}

	@GetMapping("/count")
	public long getNotificationCount() {
		// TODO connect TokenService that get current user id
		UUID userId = UUID.fromString("1934406d-e088-4a28-8c44-ccfdd5125b90");
		return notificationService.getNotificationCount(userId);
	}

	@GetMapping("/list")
	public List<NotificationDto> getNotificationList() {
		// TODO connect TokenService that get current user id
		UUID userId = UUID.fromString("1934406d-e088-4a28-8c44-ccfdd5125b90");
		return notificationService.getNotificationList(userId);
	}

}
