package com.mindbridge.core.domains.user.dto;

import com.mindbridge.data.domains.follower.model.Follower;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FollowingDto {
	UUID id;

	String avatar;

	String nickname;

	UUID followerId;


	public static FollowingDto fromEntity(Follower follower) {
		return FollowingDto.builder()
			.id(follower.getId())
			.nickname(follower.getFollowed().getNickname())
			.avatar(follower.getFollowed().getAvatar())
			.followerId(follower.getFollowed().getId()).build();
	}
}
