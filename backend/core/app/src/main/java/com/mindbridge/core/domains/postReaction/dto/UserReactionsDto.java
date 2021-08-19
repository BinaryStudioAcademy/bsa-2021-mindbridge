package com.mindbridge.core.domains.postReaction.dto;

import com.mindbridge.core.domains.user.dto.UserProfileDto;
import com.mindbridge.data.domains.postReaction.model.PostReaction;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserReactionsDto {

	private UUID postId;

	private Boolean liked;

	public static UserReactionsDto fromEntity(PostReaction postReaction) {
		return UserReactionsDto.builder()
			.postId(postReaction.getPost().getId())
			.liked(postReaction.getLiked())
			.build();
	}
}
