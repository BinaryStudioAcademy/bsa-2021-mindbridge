package com.mindbridge.core.domains.notification.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class NotificationDto {

	private UUID id;

	private Date createdAt;

	private String sourceId;

	private String text;

	private String type;

	private Boolean isRead;

}
