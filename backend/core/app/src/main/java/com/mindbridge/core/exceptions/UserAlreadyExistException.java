package com.mindbridge.core.exceptions;

import lombok.Getter;

@Getter
public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException(String message) {
        super(message);
    }
}
