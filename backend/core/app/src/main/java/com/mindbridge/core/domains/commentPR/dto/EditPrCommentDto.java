package com.mindbridge.core.domains.commentPR.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class EditPrCommentDto {

	private UUID commentId;

	private Date updatedAt;

	private String text;
}
