package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.domains.user.dto.UserProfileDataDto;
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
		return userService.getUserProfileInformation(id);
	}

	@PostMapping("/update/{id}")
	public UserDto updateUserData(@PathVariable UUID id, @RequestBody UserProfileDataDto userProfileData) {
		return userService.updateUserById(id, userProfileData);
	}

	@PostMapping("/check/nickname")
	public boolean checkUserNickname(@RequestBody String nickname) {
		System.out.println(nickname);
		String nick = nickname.substring(1, nickname.length()-1);
		return userService.checkNickname(nick);
	}

}
