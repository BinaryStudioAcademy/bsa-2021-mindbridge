package com.mindbridge.core.security.oauth2.userInfo;

import lombok.Getter;

@Getter
public class FullNameSplitter {
	private String firstName;
	private String lastName;

	public static FullNameSplitter fromFullName(String fullName) {
		FullNameSplitter fullNameSplitter = new FullNameSplitter();
		if (fullName == null) {
			return fullNameSplitter;
		}
		var nameParts = fullName.split("[ _]+");
		if (nameParts.length >= 1) {
			fullNameSplitter.firstName = nameParts[0];
		}
		if (nameParts.length >= 2) {
			fullNameSplitter.lastName = nameParts[nameParts.length - 1];
		}
		return fullNameSplitter;
	}
}
