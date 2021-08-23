package com.mindbridge.core.domains.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserShortDto {

	private UUID id;

	private String firstName;

	private String lastName;

	private String nickname;

	private String avatar;

}
