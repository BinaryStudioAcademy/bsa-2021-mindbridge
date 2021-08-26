package com.mindbridge.core.domains.postPR.dto;

import com.mindbridge.data.domains.tag.model.Tag;
import java.util.Set;
import java.util.UUID;
import lombok.Data;

@Data
public class EditPostPRDto {

	private UUID id;

	private String title;

	private String text;

	private Set<UUID> tags;

}
