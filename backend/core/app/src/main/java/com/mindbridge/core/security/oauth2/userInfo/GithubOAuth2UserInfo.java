package com.mindbridge.core.security.oauth2.userInfo;

import lombok.Getter;
import org.springframework.util.StringUtils;

import java.util.Map;

@Getter
public class GithubOAuth2UserInfo extends OAuth2UserInfo {
	private final String firstName;
	private final String lastName;
	private final String nickname;
	private final String email;

	public GithubOAuth2UserInfo(Map<String, Object> attributes, OAuthProfileHelper profileHelper) {
		super(attributes, profileHelper);
		var splitter = FullNameSplitter.fromFullName((String) attributes.get("name"));
		this.firstName = splitter.getFirstName();
		this.lastName = splitter.getLastName();
		this.nickname = (String) attributes.get("login");
		var optionalEmail = (String) attributes.get("email");
		this.email = StringUtils.isEmpty(optionalEmail)
			? profileHelper.generateEmailFromNickname(this.nickname)
			: optionalEmail;
	}

	@Override
	public String getAvatarUrl() {
		return (String) attributes.get("avatar_url");
	}

}
