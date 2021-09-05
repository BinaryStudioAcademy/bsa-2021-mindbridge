package com.mindbridge.core.domains.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserMentionsDto {

	private UUID id;

	private String nickname;

}
