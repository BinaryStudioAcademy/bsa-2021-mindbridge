package com.mindbridge.core.domains.highlight.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SavaHighlightDto {
	private UUID authorId;
	private UUID postId;
	private String text;
}
