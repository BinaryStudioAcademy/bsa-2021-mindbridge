package com.mindbridge.core.domains.postVersion.dto;

import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.core.domains.tag.dto.TagDto;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public class LastPostVersionDetailsDto {

	private UUID id;

	private Date createdAt;

	private Date updatedAt;

	private PostDetailsDto post;

	private String title;

	private String text;

	private Boolean markdown;

	private String coverImage;

	private Boolean deleted;

	private Set<TagDto> tags;

}
