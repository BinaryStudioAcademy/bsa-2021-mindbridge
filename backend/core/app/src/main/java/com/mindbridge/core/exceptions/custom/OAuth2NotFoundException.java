package com.mindbridge.core.exceptions.custom;

import lombok.Getter;

@Getter
public class OAuth2NotFoundException extends RuntimeException {

	public OAuth2NotFoundException(String message) {
		super(message);
	}

}
