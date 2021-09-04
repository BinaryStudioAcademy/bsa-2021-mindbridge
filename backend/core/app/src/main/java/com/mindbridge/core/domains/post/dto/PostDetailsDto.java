package com.mindbridge.core.domains.post.dto;

import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.core.domains.tag.dto.TagDto;
import com.mindbridge.core.domains.user.dto.UserDto;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class PostDetailsDto {

	private UUID id;

	private Date createdAt;

	private Date updatedAt;

	private String title;

	private String text;

	private UserDto author;

	private Set<TagDto> tags;

	private long rating;

	private List<CommentDto> comments;

	private String coverImage;

	private Boolean markdown;

	private Boolean draft;

	private List<RelatedPostDto> relatedPosts;

	private Boolean isFavourite;

}
