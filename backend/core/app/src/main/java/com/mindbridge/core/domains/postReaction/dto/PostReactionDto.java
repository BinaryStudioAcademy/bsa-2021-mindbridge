package com.mindbridge.core.domains.postReaction.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostReactionDto {

	private UUID id;

	private Boolean isLike;

}
