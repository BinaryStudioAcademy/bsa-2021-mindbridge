package com.mindbridge.core.domains.commentReaction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ReceivedCommentReactionDto {

	private UUID commentId;

	private UUID userId;

	private Boolean liked;

}
