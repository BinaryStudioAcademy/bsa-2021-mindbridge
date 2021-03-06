package com.mindbridge.core.domains.postPR.dto;

import com.mindbridge.core.domains.post.dto.PostDetailsDto;
import com.mindbridge.core.domains.tag.dto.TagDto;
import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.data.domains.postPR.model.PostPR.State;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.Data;

@Data
public class PostPRDetailsDto {

	private UUID id;

	private Date createdAt;

	private Date updatedAt;

	private UserDto contributor;

	private PostDetailsDto post;

	private String title;

	private String text;

	private Boolean markdown;

	private String coverImage;

	private State state;

	private Boolean deleted;

	private Set<TagDto> tags;

	private List<CommentPrDto> comments;
}
