package com.mindbridge.core.domains.commentReaction.dto;

import com.mindbridge.data.domains.commentReaction.model.CommentReaction;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserReactionsCommentsDto {

	private UUID commentId;

	private Boolean liked;

	public static UserReactionsCommentsDto fromEntity(CommentReaction commentReaction) {
		return UserReactionsCommentsDto.builder().commentId(commentReaction.getComment().getId())
				.liked(commentReaction.getLiked()).build();
	}

}
