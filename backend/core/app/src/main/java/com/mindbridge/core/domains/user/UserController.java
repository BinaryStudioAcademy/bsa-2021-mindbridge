package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.domains.user.dto.UserProfileDataDto;
import com.mindbridge.core.domains.user.dto.UserProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
		String nick = nickname.substring(0, nickname.length() - 1);
		return userService.checkNickname(nick);
	}

	@PostMapping("/check/password/{id}")
	public boolean checkUserPassword(@PathVariable UUID id, @RequestBody String password) {
		return userService.checkPassword(id, password);
	}

	@PostMapping("/update/avatar/{id}")
	public UserDto updateUserAvatar(@PathVariable UUID id, @RequestBody String url) {
		return userService.updateUserAvatarById(id, url);
	}

	@PostMapping("/update/password/{id}")
	public UserDto updateUserPassword(@PathVariable UUID id, @RequestBody String newPassword) {
		return userService.updateUserPasswordById(id, newPassword);
	}

	@GetMapping("/getalluser")
	public List<UserDto> getAllUserByNickname() {
		return userService.getAllUser();
	}

	@PostMapping("/delete/avatar/{id}")
	public UserDto deleteUserAvatar(@PathVariable UUID id) {
		return userService.deleteUserAvatar(id);
	}

}
