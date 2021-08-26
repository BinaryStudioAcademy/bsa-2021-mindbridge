package com.mindbridge.core.domains.post.dto;

import com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.dto.TagDto;
import lombok.Builder;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Builder
public class PostsListDetailsDto {

	private String id;

	private String title;

	private String text;

	private String authorId;

	private String nickname;

	private String createdAt;

	private int commentsCount;

	private long likesCount;

	private long disLikesCount;

	private long postRating;

	private String avatar;

	private int usersCount;

	private List<TagDto> tags;

	private String coverImage;

	private Boolean markdown;

	public static PostsListDetailsDto fromEntity(Post post, PostsReactionsQueryResult postsReactionsQueryResult) {
		return PostsListDetailsDto.builder().id(post.getId().toString()).title(post.getTitle()).text(post.getText())
				.authorId(post.getAuthor().getId().toString()).nickname(post.getAuthor().getNickname())
				.createdAt(getDate(post.getCreatedAt())).commentsCount(post.getComments().size())
				.tags(post.getTags().stream().map(TagDto::fromEntity).collect(Collectors.toList()))
				.likesCount(postsReactionsQueryResult.likeCount).disLikesCount(postsReactionsQueryResult.disLikeCount)
				.postRating(postsReactionsQueryResult.likeCount - postsReactionsQueryResult.disLikeCount)
				.markdown(post.getMarkdown()).coverImage(post.getCoverImage()).avatar(post.getAuthor().getAvatar())
				.build();
	}

	public static String getDate(Date date) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM", Locale.ENGLISH);
		return dateFormat.format(date);
	}

}
