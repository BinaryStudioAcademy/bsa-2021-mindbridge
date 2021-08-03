package com.mindbridge.core.domains.comment.dto;

import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.data.domains.user.model.User;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class CommentDto {
	private UUID id;
	private Date createdAt;
	private Date editedAt;
	private String text;
	private UserDto author;
	private List<CommentDto> comments;
}
