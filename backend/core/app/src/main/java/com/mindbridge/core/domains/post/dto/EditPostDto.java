package com.mindbridge.core.domains.post.dto;

import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.model.BaseEntity;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class EditPostDto {

	private UUID postId;

	private String title;

	private String text;

	private String coverImage;

	private Boolean markdown;

	private Boolean draft;

	private Set<UUID> tags;

	private UUID editorId;
}
