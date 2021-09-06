package com.mindbridge.core.domains.favourite.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateFavouriteDto {

	private UUID userId;

	private UUID postId;

}
