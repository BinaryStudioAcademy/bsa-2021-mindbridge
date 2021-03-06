package com.mindbridge.core.security.auth.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
public class RegistrationRequest {

	@NotNull
	@NotEmpty(message = "Name cannot be empty.")
	private String name;

	@NotNull
	@NotEmpty(message = "Surname cannot be empty.")
	private String surname;

	@NotNull
	@NotEmpty(message = "Nickname cannot be empty.")
	/*
	 * @Pattern(regexp = "(?=\\S+$).+", message = "Nickname must contain no whitespace.")
	 */
	private String nickname;

	@NotNull
	@NotEmpty(message = "Email cannot be empty.")
	@Email(message = "Email is not valid.",
			regexp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")
	@Size(message = "Wrong email length.", min = 3, max = 320)
	private String email;

	@NotNull
	@NotEmpty(message = "Password cannot be empty")
	@Pattern(regexp = "(?=\\S+$).+", message = "Password must contain no whitespace.")
	@Size(min = 5, message = "Password length must be at least 5 symbols.")
	private String password;

	@JsonCreator
	public RegistrationRequest(@JsonProperty("email") String email, @JsonProperty("name") String name,
			@JsonProperty("nickname") String nickname, @JsonProperty("password") String password,
			@JsonProperty("surname") String surname) {
		this.email = email.toLowerCase();
		this.name = name;
		this.nickname = nickname;
		this.password = password;
		this.surname = surname;
	}

}
