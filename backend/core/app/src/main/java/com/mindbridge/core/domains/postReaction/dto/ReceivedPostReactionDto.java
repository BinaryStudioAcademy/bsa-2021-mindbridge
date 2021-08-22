package com.mindbridge.core.domains.postReaction.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ReceivedPostReactionDto {
	private UUID postId;
	private UUID userId;
	private Boolean liked;

}
