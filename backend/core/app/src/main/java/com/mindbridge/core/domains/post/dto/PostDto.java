package com.mindbridge.core.domains.post.dto;

import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.dto.TagDto;
import com.mindbridge.data.domains.tag.model.Tag;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class PostDto {

	private UUID id;

	private String title;

	private String text;

	private String authorName;

	private int commentsCount;

	private long likesCount;

	private List<String> tags;

	public static PostDto fromEntity(Post post) {
		return PostDto
			.builder()
			.id(post.getId())
			.title(post.getTitle())
			.text(post.getText())
			.authorName(post.getAuthor().getFullName())
			.commentsCount(post.getComments().size())
			.tags(TagDto.fromEntity(post.getTags()).getName())
			.build();
	}
}
