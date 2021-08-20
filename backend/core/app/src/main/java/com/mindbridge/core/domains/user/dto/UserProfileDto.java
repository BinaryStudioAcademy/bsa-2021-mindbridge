package com.mindbridge.core.domains.user.dto;

import com.mindbridge.data.domains.post.dto.PostTitleDto;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
public class UserProfileDto {

	private UUID id;

	private String fullName;

	private String firstName;

	private String lastName;

	private String nickname;

	private String avatar;

	private int rating;

	private int commentsQuantity;

	private int postsQuantity;

	private int contributionsQuantity;

	private int followersQuantity;

	private List<PostTitleDto> lastArticleTitles;

	private Timestamp createdAt;
}
