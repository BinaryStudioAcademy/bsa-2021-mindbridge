package com.mindbridge.core.domains.tag.dto;

import com.mindbridge.data.domains.tag.model.Tag;
import lombok.Data;

import java.util.UUID;

@Data
public class TagDto {

	private UUID id;

	private String name;

}
