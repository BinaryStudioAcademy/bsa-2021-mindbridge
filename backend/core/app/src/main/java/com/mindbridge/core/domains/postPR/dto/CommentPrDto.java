package com.mindbridge.core.domains.postPR.dto;

import com.mindbridge.core.domains.user.dto.UserDto;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CommentPrDto {
	private UUID id;

	private Date createdAt;

	private Date updatedAt;

	private String text;

	private UserDto author;

	private UUID prId;
}
