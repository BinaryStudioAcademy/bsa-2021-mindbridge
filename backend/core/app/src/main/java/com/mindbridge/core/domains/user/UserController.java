package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.UserProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@Validated
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/{id}")
	public UserProfileDto getUserProfileInfo(@PathVariable UUID id) {
		return userService.getQuantityOfUsers(id);
	}
}
