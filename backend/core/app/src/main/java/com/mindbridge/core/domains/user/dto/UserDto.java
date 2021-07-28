package com.mindbridge.core.domains.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
	private UUID id;
	private String email;
	private String firstName;
	private String lastName;
	private boolean emailVerified;
}
