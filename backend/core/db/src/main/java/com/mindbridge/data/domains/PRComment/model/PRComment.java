package com.mindbridge.data.domains.PRComment.model;

import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pr_comments")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class PRComment extends BaseAuditableEntity {

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
	@JoinColumn(name = "pr_id")
	private PostPR postPR;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"PRComment\", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"\"comment_id\":" + (comment.getId() == null ? "null" : "\"" + comment.getId() + "\"") + ", " +
			"\"pr_id\":" + (postPR.getId() == null ? "null" : "\"" + postPR.getId() + "\"") + ", " +
			"}";
	}
}
