package com.mindbridge.core.security.auth;

import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.core.exceptions.UserAlreadyExistException;
import com.mindbridge.core.security.auth.dto.AuthRequest;
import com.mindbridge.core.security.auth.dto.AuthResponse;
import com.mindbridge.core.security.auth.dto.RefreshTokenRequest;
import com.mindbridge.core.security.auth.dto.RegistrationRequest;
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

	public AuthService(UserService userService, PasswordEncoder passwordEncoder,
					   JwtProvider jwtProvider, UserRepository userReposiroty) {
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
		this.jwtProvider = jwtProvider;
		this.userReposiroty = userReposiroty;
	}

	public AuthResponse performLogin(AuthRequest authRequest) {
		var userDetails = userService.loadUserByUsername(authRequest.getEmail());
		if (passwordsDontMatch(authRequest.getPassword(), userDetails.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
		}

		return AuthResponse.of(jwtProvider.generateToken(userDetails, "30min"),
			jwtProvider.generateToken(userDetails, "30days"));
	}

	private boolean passwordsDontMatch(String rawPw, String encodedPw) {
		return !passwordEncoder.matches(rawPw, encodedPw);
	}

	public AuthResponse performRegister(RegistrationRequest registrationRequest) {
		if (userReposiroty.existsByEmail(registrationRequest.getEmail())) {
			throw new UserAlreadyExistException(
				"User with email '" + registrationRequest.getEmail() + "' is already registered."
			);
		}
		if (userReposiroty.existsByNickname(registrationRequest.getNickname())) {
			throw new UserAlreadyExistException(
				"User with nickname '" + registrationRequest.getNickname() + "' is already registered."
			);
		}
		userService.registerNewUserAccount(registrationRequest);

		// need to add email verification before login new user

		return performLogin(new AuthRequest(registrationRequest.getEmail(), registrationRequest.getPassword()));
	}

	public AuthResponse refreshTokenPair(RefreshTokenRequest refreshTokenRequest) {
		String userName = jwtProvider.getLoginFromToken(refreshTokenRequest.getRefreshToken());

		if (!userName.isEmpty()) {
			var userDetails = userService.loadUserByUsername(userName);
			return AuthResponse.of(jwtProvider.generateToken(userDetails, "30min"),
				jwtProvider.generateToken(userDetails, "30days"));
		} else throw new UsernameNotFoundException("Сouldn`t find a user with such refresh token.");
	}
}
