package com.mindbridge.core.domains.post.dto;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.model.Tag;
import com.mindbridge.data.domains.user.model.User;
import java.util.Set;
import java.util.UUID;
import lombok.Data;

@Data
public class CreatePostDto {

	private String title;

	private String text;

	private String coverImage;

	private Boolean markdown;

	private UUID author;

	private Boolean draft;

	private Set<UUID> tags;

	public static Post toPost(CreatePostDto post, User author, Set<Tag> tags) {
		return Post.builder().author(author).title(post.getTitle()).text(post.getText()).markdown(post.getMarkdown())
				.draft(post.getDraft()).coverImage(post.getCoverImage()).tags(tags).build();
	}

}
