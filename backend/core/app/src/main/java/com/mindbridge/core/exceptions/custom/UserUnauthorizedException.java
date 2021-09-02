package com.mindbridge.core.exceptions.custom;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserUnauthorizedException extends RuntimeException {
	private String message;

	public UserUnauthorizedException (String message) {
		super();
		this.message = message;
	}
}
