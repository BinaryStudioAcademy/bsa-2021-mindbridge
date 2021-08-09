package com.mindbridge.core.domains.post.dto;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.postVersion.model.PostVersion;
import lombok.Builder;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

@Data
@Builder
public class PostVersionsListDto {

	private UUID id;

	private String createdAt;

	public static PostVersionsListDto fromEntity(PostVersion postVersion) {
		return PostVersionsListDto.builder().id(postVersion.getId()).createdAt(getDate(postVersion.getCreatedAt()))
				.build();
	}

	public static String getDate(Date date) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM, hh:mm", Locale.ENGLISH);
		return dateFormat.format(date);
	}

}
