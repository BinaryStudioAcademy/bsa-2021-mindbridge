package com.mindbridge.data.domains.follower.model;

import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "followers")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Follower extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "followed_id")
	private User followed;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "follower_id")
	private User follower;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"Follower\", " +
			"\"followed_id\":" + (followed.getId() == null ? "null" : "\"" + followed.getId() + "\"") + ", " +
			"\"follower_id\":" + (follower.getId() == null ? "null" : "\"" + follower.getId() + "\"") + ", " +
			"}";
	}
}
