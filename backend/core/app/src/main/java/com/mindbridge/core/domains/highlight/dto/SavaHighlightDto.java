package com.mindbridge.core.domains.highlight.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SavaHighlightDto {

	private UUID authorId;

	private UUID postId;

	private String text;

	private String tagNameStart;

	private String tagNameEnd;

	private int indexStart;

	private int indexEnd;

	private int offSetStart;

	private int offSetEnd;

}
