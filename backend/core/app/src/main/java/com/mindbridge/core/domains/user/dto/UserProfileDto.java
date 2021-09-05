package com.mindbridge.core.domains.user.dto;

import com.mindbridge.core.domains.commentReaction.dto.UserReactionsCommentsDto;
import com.mindbridge.data.domains.post.dto.PostTitleDto;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import com.mindbridge.core.domains.postReaction.dto.UserReactionsDto;

@Data
public class UserProfileDto {

	private UUID id;

	private String fullName;

	private String firstName;

	private String lastName;

	private String nickname;

	private String avatar;

	private long rating;

	private boolean emailVerified;

	private int commentsQuantity;

	private int postsQuantity;

	private int contributionsQuantity;

	private int followersQuantity;

	private int followingQuantity;

	private List<PostTitleDto> lastArticleTitles;

	private Timestamp createdAt;

	private List<UserReactionsDto> userReactions;

	private List<UserReactionsCommentsDto> userReactionsComments;

	private List<FollowerDto> followers;

	private List<FollowingDto> following;

}
