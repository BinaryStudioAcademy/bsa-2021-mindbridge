package com.mindbridge.core.domains.post.dto;

import java.util.Set;
import java.util.UUID;
import lombok.Data;

@Data
public class EditPostDto {

	private UUID postId;

	private String title;

	private String text;

	private String coverImage;

	private Boolean markdown;

	private Boolean draft;

	private Set<UUID> tags;

	private UUID editorId;
}
