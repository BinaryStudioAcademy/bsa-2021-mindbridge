package com.mindbridge.core.domains.user.dto;

import com.mindbridge.data.domains.user.model.User;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserProfileDto {

	private UUID id;

	private String fullName;

	private String avatar;

	private int postsQuantity;

	private int followersQuantity;

	private int rating;

	public static UserProfileDto fromEntity(User user) {
		return UserProfileDto.builder()
			.id(user.getId())
			.fullName(user.getFullName())
			.avatar(user.getAvatar())
			.build();
	}



}
