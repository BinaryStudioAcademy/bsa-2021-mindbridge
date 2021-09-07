package com.mindbridge.core.domains.user.dto;

import com.mindbridge.data.domains.follower.model.Follower;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FollowerDto {
	UUID id;

	String avatar;

	String nickname;

	UUID followerId;


	public static FollowerDto fromEntity(Follower follower) {
		return FollowerDto.builder()
				.id(follower.getId())
				.nickname(follower.getFollower().getNickname())
				.avatar(follower.getFollower().getAvatar())
				.followerId(follower.getFollower().getId()).build();
	}
}
