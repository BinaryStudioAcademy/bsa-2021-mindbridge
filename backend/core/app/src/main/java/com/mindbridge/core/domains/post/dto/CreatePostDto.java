package com.mindbridge.core.domains.post.dto;

import java.util.Set;
import java.util.UUID;
import lombok.Data;

@Data
public class CreatePostDto {

	private String title;

	private String text;

	private String coverImage;

	private Boolean markdown;

	private UUID author;

	private Boolean draft;

	private Set<UUID> tags;

}
