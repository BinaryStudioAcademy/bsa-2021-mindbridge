<<<<<<< HEAD
package com.mindbridge.core.security.jwt;

import lombok.Getter;

@Getter
public class JwtException extends RuntimeException {

	private final String code;

	public JwtException(String message, String code) {
		super(message);
		this.code = code;
	}

}
=======
package com.mindbridge.core.security.jwt;

import lombok.Getter;

@Getter
public class JwtException extends RuntimeException{
	private final String code;

	public JwtException(String message, String code) {
		super(message);
		this.code = code;
	}
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
