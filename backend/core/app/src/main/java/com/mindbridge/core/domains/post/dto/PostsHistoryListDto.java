package com.mindbridge.core.domains.post.dto;

import com.mindbridge.data.domains.post.model.Post;
import lombok.Builder;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

@Data
@Builder
public class PostsHistoryListDto {

	UUID id;

	String createdAt;

	public static PostsHistoryListDto fromEntity(Post post) {
		return PostsHistoryListDto.builder().id(post.getId()).createdAt(getDate(post.getCreatedAt())).build();
	}

	public static String getDate(Date date) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM, hh:mm", Locale.ENGLISH);
		return dateFormat.format(date);
	}

}
