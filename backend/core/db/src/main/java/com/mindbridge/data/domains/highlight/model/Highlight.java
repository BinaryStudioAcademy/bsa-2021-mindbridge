package com.mindbridge.data.domains.highlight.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Entity
@Table(name = "highlights")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Highlight extends BaseAuditableEntity {

	private String text;

	@Column(name = "tag_name_start")
	private String tagNameStart;

	@Column(name = "tag_name_end")
	private String tagNameEnd;

	@Column(name = "index_start")
	private Integer indexStart;

	@Column(name = "index_end")
	private Integer indexEnd;

	@Column(name = "off_set_start")
	private Integer offSetStart;

	@Column(name = "off_set_end")
	private Integer offSetEnd;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " + "\"_class\":\"Highlight\", " + "\"text\":"
				+ (text == null ? "null" : "\"" + text + "\"") + ", " + "\"user_id\":"
				+ (user.getId() == null ? "null" : "\"" + user.getId() + "\"") + ", " + "\"post_id\":"
				+ (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " + "}";
	}

}
