package com.mindbridge.core.domains.postPR.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
public class CreatePostPRDto {

	private UUID postId;

	private UUID contributorId;

	private String title;

	private String text;

	private String coverImage;

	private Boolean markdown;

	private Set<UUID> tags;

}
