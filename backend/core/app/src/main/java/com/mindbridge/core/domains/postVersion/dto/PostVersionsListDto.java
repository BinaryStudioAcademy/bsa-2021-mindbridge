package com.mindbridge.core.domains.postVersion.dto;

import com.mindbridge.core.domains.user.dto.UserShortDto;
import lombok.Data;

import java.util.UUID;

@Data
public class PostVersionsListDto {

	private UUID id;

	private String createdAt;

	private UserShortDto author;

}
