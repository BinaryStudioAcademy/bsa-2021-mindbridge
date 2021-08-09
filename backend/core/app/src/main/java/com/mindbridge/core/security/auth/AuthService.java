package com.mindbridge.core.security.auth;

import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.exceptions.custom.UserAlreadyExistException;
import com.mindbridge.core.security.auth.dto.*;
import com.mindbridge.core.security.jwt.JwtProvider;
import com.mindbridge.data.domains.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

	private final UserService userService;

	private final PasswordEncoder passwordEncoder;

	private final JwtProvider jwtProvider;

	private final UserRepository userReposiroty;

	public AuthService(UserService userService, PasswordEncoder passwordEncoder, JwtProvider jwtProvider,
			UserRepository userReposiroty) {
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
		this.jwtProvider = jwtProvider;
		this.userReposiroty = userReposiroty;
	}

	public UserDto getUserByToken(RefreshTokenRequest token) {
		String userEmail = jwtProvider.getLoginFromToken(token.getRefreshToken());

		if (!userEmail.isEmpty()) {
			return userService.loadUserDtoByEmail(userEmail);
		}
		else {
			throw new UsernameNotFoundException("Сouldn`t find a user with such refresh token.");
		}
	}

	public TokensWithUser performLogin(AuthRequest authRequest) {
		var userDetails = userService.loadUserByEmail(authRequest.getEmail());
		if (passwordsDontMatch(authRequest.getPassword(), userDetails.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
		}

		var tokens = AuthResponse.of(jwtProvider.generateToken(userDetails, "30min"),
			jwtProvider.generateToken(userDetails, "30days"));
		var userDto = userService.loadUserDtoByEmail(authRequest.getEmail());
		return new TokensWithUser(tokens, userDto);
	}

	private boolean passwordsDontMatch(String rawPw, String encodedPw) {
		return !passwordEncoder.matches(rawPw, encodedPw);
	}

	public TokensWithUser performRegister(RegistrationRequest registrationRequest) {
		if (userReposiroty.existsByEmail(registrationRequest.getEmail())) {
			throw new UserAlreadyExistException(
					"User with email '" + registrationRequest.getEmail() + "' is already registered.");
		}
		if (userReposiroty.existsByNickname(registrationRequest.getNickname())) {
			throw new UserAlreadyExistException(
					"User with nickname '" + registrationRequest.getNickname() + "' is already registered.");
		}
		userService.registerNewUserAccount(registrationRequest);

		// need to add email verification before login new user

		return performLogin(new AuthRequest(registrationRequest.getEmail(), registrationRequest.getPassword()));
	}

	public AuthResponse refreshTokenPair(RefreshTokenRequest refreshTokenRequest) {
		String userEmail = jwtProvider.getLoginFromToken(refreshTokenRequest.getRefreshToken());

		if (!userEmail.isEmpty()) {
			var userDetails = userService.loadUserByEmail(userEmail);
			return AuthResponse.of(jwtProvider.generateToken(userDetails, "30min"),
					jwtProvider.generateToken(userDetails, "30days"));
		}
		else
			throw new UsernameNotFoundException("Сouldn`t find a user with such refresh token.");
	}

}
