package com.mindbridge.core.domains.highlight.dto;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.user.model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class HighlightsDetailsDto {
	private String text;

	private UUID postId;

	private UUID userId;

	private String postTitle;

	private String tagNameStart;

	private String tagNameEnd;

	private int indexStart;

	private int indexEnd;

	private int offSetStart;

	private int offSetEnd;
}
