package com.mindbridge.core.domains.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostAuthorDto {
	private UUID id;

	private String nickname;

	private String avatar;
}
