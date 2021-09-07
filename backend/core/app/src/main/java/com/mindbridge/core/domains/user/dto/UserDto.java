package com.mindbridge.core.domains.user.dto;

import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;
import java.util.*;

@Getter
@Setter
public class UserDto {

	private UUID id;

	private Timestamp createdAt;

	private String nickname;

	private String avatar;

	private String email;

	private String firstName;

	private String lastName;

	private long rating;

	private int commentsQuantity;

	private int postsQuantity;

	private int followersQuantity;

}
