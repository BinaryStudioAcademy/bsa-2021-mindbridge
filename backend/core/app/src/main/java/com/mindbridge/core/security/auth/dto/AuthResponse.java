package com.mindbridge.core.security.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

	private String accessToken;

	private String refreshToken;

	public static AuthResponse of(String accessToken, String refreshToken) {
		AuthResponse response = new AuthResponse();
		response.setAccessToken(accessToken);
		response.setRefreshToken(refreshToken);
		return response;
	}

}
