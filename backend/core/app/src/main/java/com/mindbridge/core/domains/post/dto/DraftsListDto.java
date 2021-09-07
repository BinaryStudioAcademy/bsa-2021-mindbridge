package com.mindbridge.core.domains.post.dto;

import com.mindbridge.core.domains.tag.dto.TagDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class DraftsListDto {

	private UUID id;

	private String title;

	private String createdAt;

	private List<TagDto> tags;

	private String coverImage;

	private Boolean draft;

}
