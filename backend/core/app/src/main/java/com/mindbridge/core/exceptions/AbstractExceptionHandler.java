package com.mindbridge.core.exceptions;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class AbstractExceptionHandler {
	protected ApiError setResponseStatusAndReturnError(Exception exception, String code, HttpStatus status, HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(status.value());
		return ApiError.of(status, code, exception.getLocalizedMessage(), request.getRequestURI());
	}
}
