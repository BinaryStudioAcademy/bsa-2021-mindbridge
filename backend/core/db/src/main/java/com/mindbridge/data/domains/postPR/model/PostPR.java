package com.mindbridge.data.domains.postPR.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "post_pr")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class PostPR extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "contributor_id")
	private User contributor;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	private String text;

	private Boolean closed;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"PostPR\", " +
			"\"postId\":" + (contributor.getId() == null ? "null" : "\"" + contributor.getId() + "\"") + ", " +
			"\"postId\":" + (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"\"closed\":" + (closed == null ? "null" : "\"" + closed + "\"") + ", " +
			"}";
	}
}
