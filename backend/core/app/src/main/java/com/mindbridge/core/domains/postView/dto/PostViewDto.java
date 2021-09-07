package com.mindbridge.core.domains.postView.dto;

import java.util.UUID;
import lombok.Data;

@Data
public class PostViewDto {
	private String userId;
	private String userIp;
	private UUID postId;
}
