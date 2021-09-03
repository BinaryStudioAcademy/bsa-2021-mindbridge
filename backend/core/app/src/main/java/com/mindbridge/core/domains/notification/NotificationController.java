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
	public long getUnreadNotificationCount(@PathVariable(name = "id") UUID id) {
		return notificationService.getNotificationCount(id);
	}

	@GetMapping("/list/{id}")
	public List<NotificationDto> getNotificationList(@PathVariable(name = "id") UUID id,
													 @RequestParam(defaultValue = "true") Boolean onlyUnread,
													 @RequestParam(defaultValue = "0") Integer from,
													 @RequestParam(defaultValue = "10") Integer count) {
		return notificationService.getNotificationList(id, onlyUnread, from, count);
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
