package com.mindbridge.data.domains.highlight.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "highlights")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Highlight extends BaseAuditableEntity {

	private String text;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"Highlight\", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"\"user_id\":" + (user.getId() == null ? "null" : "\"" + user.getId() + "\"") + ", " +
			"\"post_id\":" + (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " +
			"}";
	}
}
