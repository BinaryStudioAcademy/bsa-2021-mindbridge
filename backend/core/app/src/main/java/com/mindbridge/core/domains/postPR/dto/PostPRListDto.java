package com.mindbridge.core.domains.postPR.dto;

import com.mindbridge.core.domains.user.dto.UserShortDto;
import com.mindbridge.data.domains.postPR.model.PostPR.State;
import lombok.Data;

import java.util.UUID;

@Data
public class PostPRListDto {

	private UUID id;

	private String createdAt;

	private UserShortDto author;

	private State state;

}
