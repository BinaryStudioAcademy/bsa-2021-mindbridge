package com.mindbridge.data.domains.post.dto;

import com.mindbridge.data.domains.post.model.Post;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PostTitleDto {

	private String id;

	private String title;

	public static PostTitleDto fromEntity(Post post) {
		return PostTitleDto.builder().id(post.getId().toString()).title(post.getTitle()).build();
	}
}
