package com.mindbridge.core.domains.commentReaction.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ResponseCommentReactionDto {

	private UUID id;

	private UUID commentId;

	private Boolean liked;

	private UUID userId;

	private UUID authorId;

	private Boolean isFirstReaction;
}
