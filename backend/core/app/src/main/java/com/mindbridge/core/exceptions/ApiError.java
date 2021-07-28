package com.mindbridge.core.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiError {
	private HttpStatus status;
	private String code;
	private String message;
	private String path;

	public static ApiError of(HttpStatus status, String code, String message, String path) {
		ApiError apiError = new ApiError();
		apiError.setCode(code);
		apiError.setMessage(message);
		apiError.setStatus(status);
		apiError.setPath(path);
		return apiError;
	}
}
