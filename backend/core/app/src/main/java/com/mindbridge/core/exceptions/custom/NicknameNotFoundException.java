package com.mindbridge.core.exceptions.custom;

import lombok.Getter;

@Getter
public class NicknameNotFoundException extends RuntimeException {

	public NicknameNotFoundException(String message) {
		super(message);
	}

}
