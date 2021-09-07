package com.mindbridge.data.domains.tag.dto;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.model.Tag;
import lombok.Builder;
import lombok.Data;

import java.util.*;
import java.util.stream.Collectors;

@Data
@Builder
public class TagDataDto {

	String id;

	String name;

	public static TagDataDto fromEntity(Tag tag) {
		return TagDataDto.builder().id(tag.getId().toString()).name(tag.getName()).build();
	}

}
