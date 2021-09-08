package com.mindbridge.data.domains.postViews.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.model.BaseAuditableEntity;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "post_views")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class PostView extends BaseAuditableEntity {
	@Column(name = "user_id")
	private String userId;
	@Column(name = "user_ip")
	private String userIp;
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinColumn(name = "post_id")
	private Post post;
}
