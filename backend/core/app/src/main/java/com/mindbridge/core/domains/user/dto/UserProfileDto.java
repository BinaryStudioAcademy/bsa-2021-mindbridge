package com.mindbridge.core.domains.user.dto;

import com.mindbridge.core.domains.post.dto.PostsHistoryListDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class UserProfileDto {

	private UUID id;

	private String fullName;

	private String avatar;

	private int postsQuantity;

	private int followersQuantity;

	private int rating;

	private List<PostsHistoryListDto> datesOfPosts;

}
