package com.mindbridge.core.domains.post.dto;

import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.domains.user.dto.UserProfileDto;
import com.mindbridge.data.domains.tag.dto.TagDataDto;
import lombok.Data;

import java.util.*;

@Data
public class PostsListDetailsDto {

	private UUID id;

	private String title;

	private String text;

	private UserDto author;

	private String createdAt;

	private int commentsCount;

	private long likesCount;

	private long disLikesCount;

	private long postRating;

	private int usersCount;

	private List<TagDataDto> tags;

	private String coverImage;

	private Boolean markdown;

	private Boolean reacted;

	private Boolean isLiked;

	private Boolean isFavourite;

}
