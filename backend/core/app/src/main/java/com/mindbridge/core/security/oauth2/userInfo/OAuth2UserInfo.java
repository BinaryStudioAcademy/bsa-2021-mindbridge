package com.mindbridge.core.security.oauth2.userInfo;

import java.util.Map;

public abstract class OAuth2UserInfo {

	protected Map<String, Object> attributes;

	protected OAuthProfileHelper profileHelper;

	public OAuth2UserInfo(Map<String, Object> attributes, OAuthProfileHelper profileHelper) {
		this.attributes = attributes;
		this.profileHelper = profileHelper;
	}

	public abstract String getNickname();

	public abstract String getEmail();

	public abstract String getAvatarUrl();

	public abstract String getFirstName();

	public abstract String getLastName();

}
