package com.mindbridge.core.domains.tag.dto;

import com.mindbridge.data.domains.tag.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class TagDto {

	private UUID id;

	private String name;

	public static TagDto fromEntity(Tag tag){
		return new TagDto(tag.getId(), tag.getName());
	}

}
