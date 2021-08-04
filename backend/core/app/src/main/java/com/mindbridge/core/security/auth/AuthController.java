<<<<<<< HEAD
package com.mindbridge.core.security.auth;

import com.mindbridge.core.security.auth.dto.AuthRequest;
import com.mindbridge.core.security.auth.dto.AuthResponse;
import com.mindbridge.core.security.auth.dto.RefreshTokenRequest;
import com.mindbridge.core.security.auth.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("auth")
public class AuthController {

	private final AuthService authService;

	@Autowired
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login")
	public AuthResponse login(@Valid @RequestBody AuthRequest authRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errors = bindingResult.getAllErrors().stream()
					.map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors.toString());
		}
		return authService.performLogin(authRequest);
	}

	@PostMapping("/register")
	public AuthResponse register(@Valid @RequestBody RegistrationRequest registrationRequest,
			BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errors = bindingResult.getAllErrors().stream()
					.map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors.toString());
		}
		return authService.performRegister(registrationRequest);
	}

	@PostMapping("/refresh")
	public AuthResponse refreshTokenPair(@RequestBody RefreshTokenRequest refreshTokenRequest) {
		return authService.refreshTokenPair(refreshTokenRequest);
	}

}
=======
package com.mindbridge.core.security.auth;

import com.mindbridge.core.security.auth.dto.AuthRequest;
import com.mindbridge.core.security.auth.dto.AuthResponse;
import com.mindbridge.core.security.auth.dto.RefreshTokenRequest;
import com.mindbridge.core.security.auth.dto.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("auth")
public class AuthController {
	private final AuthService authService;

	@Autowired
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login")
	public AuthResponse login(@Valid @RequestBody AuthRequest authRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errors = bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors.toString());
		}
		return authService.performLogin(authRequest);
	}

	@PostMapping("/register")
	public AuthResponse register(@Valid @RequestBody RegistrationRequest registrationRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errors = bindingResult.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors.toString());
		}
		return authService.performRegister(registrationRequest);
	}

	@PostMapping("/refresh")
	public AuthResponse refreshTokenPair(@RequestBody RefreshTokenRequest refreshTokenRequest) {
		return authService.refreshTokenPair(refreshTokenRequest);
	}
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
