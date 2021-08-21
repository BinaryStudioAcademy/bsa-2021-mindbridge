package com.mindbridge.core.domains.user.dto;

import com.mindbridge.core.domains.postReaction.dto.UserReactionsDto;
import com.mindbridge.data.domains.postReaction.model.PostReaction;
import lombok.Builder;
import lombok.Data;

import java.util.*;

@Data
public class UserProfileDto {

	private UUID id;

	private String fullName;

	private String nickname;

	private String avatar;

	private int postsQuantity;

	private int followersQuantity;

	private int rating;

	private List<UserReactionsDto> userReactions;

}
