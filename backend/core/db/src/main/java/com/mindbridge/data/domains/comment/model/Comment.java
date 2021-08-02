package com.mindbridge.data.domains.comment.model;

import com.mindbridge.data.domains.commentReaction.model.CommentReaction;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Comment extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private User author;

	private String text;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "comment_id")
	private Comment comment;

	@OneToMany(mappedBy = "comment", cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	private List<Comment> comments = new ArrayList<>();

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "post_id")
	private Post post;

	@OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<CommentReaction> reactions = new ArrayList<>();

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"Comment\", " +
			"\"authorId\":" + (author.getId() == null ? "null" : "\"" + author.getId() + "\"") + ", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"\"commentId\":" + (comment.getId() == null ? "null" : "\"" + comment.getId() + "\"") + ", " +
			"\"postId\":" + (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " +
			"}";
	}
}
