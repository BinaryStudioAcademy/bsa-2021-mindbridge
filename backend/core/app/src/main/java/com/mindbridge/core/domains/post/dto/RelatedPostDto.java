package com.mindbridge.core.domains.post.dto;

import com.mindbridge.core.domains.user.dto.UserDto;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class RelatedPostDto {

	private UUID id;

	private Date createdAt;

	private Date updatedAt;

	private String title;

	private String text;

	private long rating;

	private UserDto author;

	private String coverImage;

}
