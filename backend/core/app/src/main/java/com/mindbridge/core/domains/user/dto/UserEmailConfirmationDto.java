package com.mindbridge.core.domains.user.dto;

import lombok.Data;

@Data
public class UserEmailConfirmationDto {

	private boolean emailVerified;

	private boolean isViewed;

}
