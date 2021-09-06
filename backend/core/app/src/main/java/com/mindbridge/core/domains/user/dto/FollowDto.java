package com.mindbridge.core.domains.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class FollowDto {

	private UUID followerId;

	private UUID followedId;

}
