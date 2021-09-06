package com.mindbridge.core.security.oauth2.userInfo;

import com.mindbridge.core.exceptions.custom.OAuth2NotFoundException;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class OAuth2UserInfoFactory {

	private final OAuthProfileHelper profileHelper;

	public OAuth2UserInfoFactory(OAuthProfileHelper profileHelper) {
		this.profileHelper = profileHelper;
	}

	public OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
		switch (registrationId) {
		case "google": {
			return new GoogleOAuth2UserInfo(attributes, profileHelper);
		}
		case "facebook": {
			return new FacebookOAuth2UserInfo(attributes, profileHelper);
		}
		case "github": {
			return new GithubOAuth2UserInfo(attributes, profileHelper);
		}
		default: {
			throw new OAuth2NotFoundException("Login through " + registrationId + " is not supported!");
		}
		}
	}

}
