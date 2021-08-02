package com.mindbridge.data.domains.postReaction.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "post_reactions")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class PostReaction extends BaseAuditableEntity {

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "author_id")
	private User author;

	private Boolean liked;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "post_id")
	private Post post;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"PostReaction\", " +
			"\"authorId\":" + (author.getId() == null ? "null" : "\"" + author.getId() + "\"") + ", " +
			"\"like\":" + (liked == null ? "null" : "\"" + liked + "\"") + ", " +
			"\"postId\":" + (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " +
			"}";
	}
}
