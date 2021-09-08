package com.mindbridge.data.domains.user.model;

import com.mindbridge.data.domains.achievement.model.Achievement;
import com.mindbridge.data.model.BaseAuditableEntity;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class User extends BaseAuditableEntity {

	@Column(unique = true, nullable = false)
	@EqualsAndHashCode.Include
	private String email;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	private String nickname;

	@Column
	private String password;

	@Column(name = "verified_email", nullable = false)
	private boolean emailVerified;

	private String avatar;

	private String activationCode;

	@Column(name = "is_viewed", nullable = false)
	private boolean isViewed;

	public String getFullName() {
		return firstName + " " + lastName;
	}

	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinTable(name = "users_achievements", joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "achievement_id"))
	private Set<Achievement>  achievements = new HashSet<>();

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " + "\"_class\":\"User\", " + "\"email\":"
				+ (email == null ? "null" : "\"" + email + "\"") + ", " + "\"first_name\":"
				+ (firstName == null ? "null" : "\"" + firstName + "\"") + ", " + "\"last_name\":"
				+ (lastName == null ? "null" : "\"" + lastName + "\"") + ", " + "\"nickname\":"
				+ (nickname == null ? "null" : "\"" + nickname + "\"") + ", " + "\"password\":"
				+ (password == null ? "null" : "\"" + password + "\"") + ", " + "\"emailVerified\":\"" + emailVerified
				+ "\"" + ", " + "}";
	}

}
