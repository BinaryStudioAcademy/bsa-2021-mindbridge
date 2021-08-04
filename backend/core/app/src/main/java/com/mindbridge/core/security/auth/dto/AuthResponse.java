<<<<<<< HEAD
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
=======
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
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
