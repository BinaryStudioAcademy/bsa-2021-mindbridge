package com.mindbridge.data.domains.usersAchievement.model;

import com.mindbridge.data.domains.achievement.model.Achievement;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "users_achievements")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class UsersAchievement extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "achievement_id")
	private Achievement achievement;

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"UsersAchievement\", " +
			"\"user_id\":" + (user.getId() == null ? "null" : "\"" + user.getId() + "\"") + ", " +
			"\"achievement_id\":" + (achievement.getId() == null ? "null" : "\"" + achievement.getId() + "\"") + ", " +
			"}";
	}
}
