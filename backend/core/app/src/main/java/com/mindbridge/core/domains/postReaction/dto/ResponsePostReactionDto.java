package com.mindbridge.core.domains.postReaction.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ResponsePostReactionDto {
	private UUID id;
	private UUID postId;
	private Boolean liked;
	private UUID userId;
	private UUID authorId;
	private Boolean isFirstReaction;

}
