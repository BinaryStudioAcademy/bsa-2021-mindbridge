package com.mindbridge.core.security.oauth2.userInfo;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
@Getter
public class FacebookOAuth2UserInfo extends OAuth2UserInfo {

	private final String avatarUrl;

	private final String firstName;

	private final String lastName;

	private final String nickname;

	private final String email;

	public FacebookOAuth2UserInfo(Map<String, Object> attributes, OAuthProfileHelper profileHelper) {
		super(attributes, profileHelper);
		this.avatarUrl = extractAvatarUrl(attributes.get("picture"));
		var splitter = FullNameSplitter.fromFullName((String) attributes.get("name"));
		this.firstName = splitter.getFirstName();
		this.lastName = splitter.getLastName();
		this.email = (String) attributes.get("email");
		this.nickname = profileHelper.getNicknameFromEmail(this.email);
	}

	private String extractAvatarUrl(Object pictureAttribute) {
		if (pictureAttribute == null) {
			return null;
		}
		try {
			@SuppressWarnings("unchecked")
			var pictureMap = (Map<String, Map<String, String>>) pictureAttribute;
			return pictureMap.get("data").get("url");
		}
		catch (Exception e) {
			log.error("Can't get facebook avatar", e);
			return null;
		}
	}

}
