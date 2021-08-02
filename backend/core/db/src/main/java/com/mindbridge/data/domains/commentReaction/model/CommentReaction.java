package com.mindbridge.data.domains.commentReaction.model;

import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "comment_reactions")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class CommentReaction extends BaseAuditableEntity {

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "author_id")
	private User author;

	private Boolean liked;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "comment_id")
	private Comment comment;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"CommentReaction\", " +
			"\"authorId\":" + (author.getId() == null ? "null" : "\"" + author.getId() + "\"") + ", " +
			"\"like\":" + (liked == null ? "null" : "\"" + liked + "\"") + ", " +
			"\"commentId\":" + (comment.getId() == null ? "null" : "\"" + comment.getId() + "\"") + ", " +
			"}";
	}
}
