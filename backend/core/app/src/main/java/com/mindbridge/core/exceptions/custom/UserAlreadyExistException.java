package com.mindbridge.core.exceptions.custom;

import lombok.Getter;

@Getter
public class UserAlreadyExistException extends RuntimeException {

    public UserAlreadyExistException(String message) {
        super(message);
    }
}
