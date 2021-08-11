package com.mindbridge.core.domains.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserProfileDto {

	private UUID id;

	private String fullName;

	private String avatar;

	private int postsQuantity;

	private int followersQuantity;

	private int rating;

}
