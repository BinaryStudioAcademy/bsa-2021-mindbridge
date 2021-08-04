package com.mindbridge.data.domains.tag.dto;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.model.Tag;
import lombok.Builder;
import lombok.Data;

import java.util.*;
import java.util.stream.Collectors;

@Data
@Builder
public class TagDto {
	List<String> name;
	public static TagDto fromEntity(Set<Tag> tags) {
		return TagDto
			.builder()
			.name(tags.stream().map(Tag::getName).collect(Collectors.toList()))
			.build();
	}
}
