<<<<<<< HEAD:backend/core/app/src/main/java/com/mindbridge/core/exceptions/handling/AbstractExceptionHandler.java
package com.mindbridge.core.exceptions.handling;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class AbstractExceptionHandler {

	protected ApiError setResponseStatusAndReturnError(Exception exception, String code, HttpStatus status,
			HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(status.value());
		return ApiError.of(status, code, exception.getLocalizedMessage(), request.getRequestURI());
	}

}
=======
package com.mindbridge.core.exceptions.handling;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class AbstractExceptionHandler {
	protected ApiError setResponseStatusAndReturnError(Exception exception, String code, HttpStatus status, HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(status.value());
		return ApiError.of(status, code, exception.getLocalizedMessage(), request.getRequestURI());
	}
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44:backend/core/app/src/main/java/com/mindbridge/core/exceptions/AbstractExceptionHandler.java
