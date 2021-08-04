package com.mindbridge.core.domains.comment.dto;

import com.mindbridge.core.domains.user.dto.UserDto;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class CommentDto {

	private UUID id;

	private Date createdAt;

	private Date updatedAt;

	private String text;

	private UserDto author;

	private long rating;

	private List<CommentDto> comments;

}
