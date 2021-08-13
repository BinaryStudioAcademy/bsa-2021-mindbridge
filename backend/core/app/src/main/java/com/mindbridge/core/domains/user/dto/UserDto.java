package com.mindbridge.core.domains.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class UserDto {

	private UUID id;

	private String nickname;

	private String avatar;

	private String firstName;

	private String lastName;

}
