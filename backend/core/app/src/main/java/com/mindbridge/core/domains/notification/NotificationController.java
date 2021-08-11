package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping("/count/{id}")
	public long getNotificationCount(@PathVariable(name = "id") UUID id) {
		return notificationService.getNotificationCount(id);
	}

	@GetMapping("/list/{id}")
	public List<NotificationDto> getNotificationList(@PathVariable(name = "id") UUID id) {
		return notificationService.getNotificationList(id);
	}

}
