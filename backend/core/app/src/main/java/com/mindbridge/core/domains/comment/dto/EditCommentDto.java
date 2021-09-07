package com.mindbridge.core.domains.comment.dto;

import lombok.Data;

import java.util.UUID;
import java.util.Date;

@Data
public class EditCommentDto {

	private UUID commentId;

	private Date updatedAt;

	private String text;

}
