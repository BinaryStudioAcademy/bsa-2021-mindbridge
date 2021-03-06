package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
	public UserProfileDto getUserProfileInfo(@PathVariable UUID id, Principal principal) {
		return userService.getUserProfileInformation(id, principal);
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

	@GetMapping("/find")
	public List<UserMentionsDto> getAllUserByNickname(@RequestParam("query") String query) {
		return userService.getAllUser(query);
	}

	@PutMapping("/follow")
	public void followUser(@RequestBody FollowDto followDto, Principal principal) {
		userService.followUser(followDto, principal);
	}

	@PostMapping("/delete/avatar/{id}")
	public UserDto deleteUserAvatar(@PathVariable UUID id) {
		return userService.deleteUserAvatar(id);
	}

	@GetMapping("/count")
	public long getAllUsersCount() {
		return userService.getAllUsersCount();
	}
}
