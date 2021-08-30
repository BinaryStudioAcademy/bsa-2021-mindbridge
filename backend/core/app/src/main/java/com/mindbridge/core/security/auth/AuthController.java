package com.mindbridge.core.security.auth;

import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.security.auth.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
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
	public TokensWithUser login(@Valid @RequestBody AuthRequest authRequest, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errors = bindingResult.getAllErrors().stream()
					.map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errors.toString());
		}
		return authService.performLogin(authRequest);
	}

	@PostMapping("/register")
	public TokensWithUser register(@Valid @RequestBody RegistrationRequest registrationRequest,
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

	@PostMapping("/getUser")
	public UserDto getUserByToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
		return authService.getUserByToken(refreshTokenRequest);
	}

	@GetMapping("/activate/{code}")
	public void activateUserEmail(@PathVariable String code) {
		authService.activateEmail(code);
	}

}
