package com.mindbridge.core.security.auth;

import com.mindbridge.core.domains.user.UserMapper;
import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.domains.user.dto.UserProfileDto;
import com.mindbridge.core.exceptions.custom.UserAlreadyExistException;
import com.mindbridge.core.security.auth.dto.*;
import com.mindbridge.core.security.jwt.JwtProvider;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class AuthService {

	private final UserService userService;

	private final PasswordEncoder passwordEncoder;

	private final JwtProvider jwtProvider;

	private final UserRepository userRepository;

	public AuthService(UserService userService, PasswordEncoder passwordEncoder, JwtProvider jwtProvider,
					   UserRepository userRepository) {
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
		this.jwtProvider = jwtProvider;
		this.userRepository = userRepository;
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
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
		}

		var tokens = AuthResponse.of(
			jwtProvider.generateAccessToken(userDetails.getUsername()),
			jwtProvider.generateRefreshToken(userDetails.getUsername())
		);
		var userDto = userService.loadUserDtoByEmail(authRequest.getEmail());
		return new TokensWithUser(tokens, userDto);
	}

	private boolean passwordsDontMatch(String rawPw, String encodedPw) {
		return !passwordEncoder.matches(rawPw, encodedPw);
	}

	public TokensWithUser performRegister(RegistrationRequest registrationRequest) {
		if (userRepository.existsByEmail(registrationRequest.getEmail())) {
			throw new UserAlreadyExistException(
				"User with email '" + registrationRequest.getEmail() + "' is already registered.");
		}
		if (userRepository.existsByNickname(registrationRequest.getNickname())) {
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
			return AuthResponse.of(
				jwtProvider.generateAccessToken(userDetails.getUsername()),
				jwtProvider.generateRefreshToken(userDetails.getUsername())
			);
		}
		else {
			throw new UsernameNotFoundException("Сouldn`t find a user with such refresh token.");
		}
	}

	public UserProfileDto activateEmail(UUID code) {
		var user = userRepository.findByActivationCode(code.toString()).orElseThrow();
		user.setActivationCode(null);
		user.setEmailVerified(true);
		var savedUser = userRepository.save(user);
		return UserMapper.MAPPER.userToUserProfileDto(savedUser);
	}
}
