package com.mindbridge.core.security.oauth2.userInfo;

import lombok.Getter;

import java.util.Map;

@Getter
public class GoogleOAuth2UserInfo extends OAuth2UserInfo {
	private final String nickname;

	public GoogleOAuth2UserInfo(Map<String, Object> attributes, OAuthProfileHelper profileHelper) {
		super(attributes, profileHelper);
		this.nickname = profileHelper.getNicknameFromEmail((String) attributes.get("email"));
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getFirstName() {
		return (String) attributes.get("given_name");
	}

	@Override
	public String getLastName() {
		return (String) attributes.get("family_name");
	}

	@Override
	public String getAvatarUrl() {
		return (String) attributes.get("picture");
	}

}
