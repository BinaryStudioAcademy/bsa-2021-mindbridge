<<<<<<< HEAD
package com.mindbridge.core.security.oauth2.userInfo;

import com.mindbridge.core.exceptions.custom.OAuth2NotFoundException;

import java.util.Map;

public class OAuth2UserInfoFactory {

	public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
		switch (registrationId) {
		case "google": {
			return new GoogleOAuth2UserInfo(attributes);
		}
		case "facebook": {
			return new FacebookOAuth2UserInfo(attributes);
		}
		case "github": {
			return new GithubOAuth2UserInfo(attributes);
		}
		default: {
			throw new OAuth2NotFoundException("Login through " + registrationId + " is not supported!");
		}
		}
	}

}
=======
package com.mindbridge.core.security.oauth2.userInfo;

import com.mindbridge.core.exceptions.custom.OAuth2NotFoundException;

import java.util.Map;

public class OAuth2UserInfoFactory {
	public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
		switch (registrationId) {
			case "google": {
				return new GoogleOAuth2UserInfo(attributes);
			}
			case "facebook": {
				return new FacebookOAuth2UserInfo(attributes);
			}
			case "github": {
				return new GithubOAuth2UserInfo(attributes);
			}
			default: {
				throw new OAuth2NotFoundException("Login through " + registrationId + " is not supported!");
			}
		}
	}
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
