package com.mindbridge.core.domains.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
public class CreateNotificationDto {

	private UUID sourceId;

	private UUID receiverId;

	private String text;

	private String type;

}
