package com.mindbridge.core.domains.comment.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateCommentDto {

	private UUID postId;

	private String text;

	private UUID author;

	private String nickname;

	private String avatar;

}
