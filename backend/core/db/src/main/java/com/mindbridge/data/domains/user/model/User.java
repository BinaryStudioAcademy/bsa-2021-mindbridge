package com.mindbridge.data.domains.user.model;

import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

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

	public String getFullName() {
		return firstName + " " + lastName;
	}

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"User\", " +
			"\"email\":" + (email == null ? "null" : "\"" + email + "\"") + ", " +
			"\"first_name\":" + (firstName == null ? "null" : "\"" + firstName + "\"") + ", " +
			"\"last_name\":" + (lastName == null ? "null" : "\"" + lastName + "\"") + ", " +
			"\"nickname\":" + (nickname == null ? "null" : "\"" + nickname + "\"") + ", " +
			"\"password\":" + (password == null ? "null" : "\"" + password + "\"") + ", " +
			"\"emailVerified\":\"" + emailVerified + "\"" + ", " +
			"}";
	}
}

