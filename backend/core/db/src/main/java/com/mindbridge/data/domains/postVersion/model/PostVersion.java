package com.mindbridge.data.domains.postVersion.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "post_versions")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class PostVersion extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	private String title;

	private String text;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"PostVersion\", " +
			"\"postId\":" + (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " +
			"\"title\":" + (title == null ? "null" : "\"" + title + "\"") + ", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"}";
	}
}
