package com.mindbridge.core.domains.postReaction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ReceivedPostReactionDto {

	private UUID postId;

	private UUID userId;

	private Boolean liked;

}
