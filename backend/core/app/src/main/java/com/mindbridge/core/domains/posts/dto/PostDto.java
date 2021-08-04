package com.mindbridge.core.domains.posts.dto;

import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.dto.TagDto;
import com.mindbridge.data.domains.tag.model.Tag;
import lombok.Builder;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Builder
public class PostDto {

	private String id;

	private String title;

	private String text;

	private String authorName;

	private String createdAt;

	private int commentsCount;

	private long likesCount;

	private long disLikesCount;

	private long postRating;

	private List<TagDto> tags;

	public static PostDto fromEntity(Post post, PostsReactionsQueryResult postsReactionsQueryResult) {
		return PostDto
			.builder()
			.id(post.getId().toString())
			.title(post.getTitle())
			.text(post.getText())
			.authorName(post.getAuthor().getFullName())
			.createdAt(getDate(post.getCreatedAt()))
			.commentsCount(post.getComments().size())
			.tags(post.getTags().stream().map(TagDto::fromEntity).collect(Collectors.toList()))
			.likesCount(postsReactionsQueryResult.likeCount)
			.disLikesCount(postsReactionsQueryResult.disLikeCount)
			.postRating(postsReactionsQueryResult.likeCount - postsReactionsQueryResult.disLikeCount)
			.build();
	}

	public static String getDate(Date date) {
		SimpleDateFormat yourDateFormat = new SimpleDateFormat("dd MMMM", Locale.ENGLISH);
		return yourDateFormat.format(date);
	}
}
