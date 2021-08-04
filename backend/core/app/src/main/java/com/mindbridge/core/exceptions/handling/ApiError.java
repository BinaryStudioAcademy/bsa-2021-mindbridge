<<<<<<< HEAD:backend/core/app/src/main/java/com/mindbridge/core/exceptions/handling/ApiError.java
package com.mindbridge.core.exceptions.handling;

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
=======
package com.mindbridge.core.exceptions.handling;

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
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44:backend/core/app/src/main/java/com/mindbridge/core/exceptions/ApiError.java
