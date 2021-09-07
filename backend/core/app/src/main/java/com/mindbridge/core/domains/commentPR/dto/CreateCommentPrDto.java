package com.mindbridge.core.domains.commentPR.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateCommentPrDto {

	private UUID prId;

	private String text;

	private UUID author;

	private String nickname;

	private String avatar;

}
