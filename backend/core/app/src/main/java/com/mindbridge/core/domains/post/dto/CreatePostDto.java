package com.mindbridge.core.domains.post.dto;

import com.mindbridge.core.domains.tag.dto.TagDto;
import com.mindbridge.core.domains.user.dto.UserDto;
import java.util.Date;
import java.util.Set;
import java.util.UUID;
import lombok.Data;

@Data
public class CreatePostDto {
	private Date createdAt;

	private String title;

	private String text;

	private String coverImage;

	private Boolean markdown;

	private UUID author;

	private Set<UUID> tags;
}
