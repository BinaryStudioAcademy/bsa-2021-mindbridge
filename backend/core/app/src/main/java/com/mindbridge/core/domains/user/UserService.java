package com.mindbridge.core.domains.user;

import com.mindbridge.data.domains.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

	private final UserRepository userRepository;

	public static final String PHONE_REGEX = "^\\d{10}$";
	public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z].{2})(?=.*[A-Z])(?=\\S+$).{8,40}$";

  @Lazy
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
}
