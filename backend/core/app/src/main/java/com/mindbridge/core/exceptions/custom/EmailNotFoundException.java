package com.mindbridge.core.exceptions.custom;

import lombok.Getter;

@Getter
public class EmailNotFoundException extends RuntimeException {

	public EmailNotFoundException(String message) {
		super(message);
	}

}
