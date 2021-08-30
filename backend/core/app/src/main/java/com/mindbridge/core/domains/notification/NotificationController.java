package com.mindbridge.core.domains.notification;

import com.mindbridge.core.domains.notification.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping("/unreadList/{id}")
	public List<NotificationDto> getUnreadNotificationList(@PathVariable(name = "id") UUID id) {
		return notificationService.getUnreadNotificationList(id);
	}

	@GetMapping("/list/{id}")
	public List<NotificationDto> getNotificationList(@PathVariable(name = "id") UUID id) {
		return notificationService.getNotificationList(id);
	}

	@PutMapping("/{id}")
	public void toggleNotificationRead(@PathVariable UUID id) {
		notificationService.toggleNotificationRead(id);
	}

	@PutMapping("/readAll/{id}")
	public void readAllNotifications(@PathVariable UUID id) {
		notificationService.readAll(id);
	}

}
