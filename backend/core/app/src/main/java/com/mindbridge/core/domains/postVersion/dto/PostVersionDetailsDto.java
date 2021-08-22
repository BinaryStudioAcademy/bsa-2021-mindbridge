package com.mindbridge.core.domains.postVersion.dto;

import com.mindbridge.core.domains.tag.dto.TagDto;
import lombok.Data;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Data
public class PostVersionDetailsDto {
	private UUID id;

	private Date createdAt;

	private Date updatedAt;

	private com.mindbridge.core.domains.post.dto.PostVersionDetailsDto post;

	private String title;

	private String text;

	private Boolean markdown;

	private String coverImage;

	private Boolean deleted;

	private Set<TagDto> tags;
}
