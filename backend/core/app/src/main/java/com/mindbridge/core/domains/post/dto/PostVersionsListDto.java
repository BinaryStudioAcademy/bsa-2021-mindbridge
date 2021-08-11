package com.mindbridge.core.domains.post.dto;

import com.mindbridge.core.domains.helpers.DateFormatter;
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
		String format = "dd MMMM, hh:mm";
		return PostVersionsListDto.builder().id(postVersion.getId())
				.createdAt(DateFormatter.getDate(postVersion.getCreatedAt(), format)).build();
	}

}
