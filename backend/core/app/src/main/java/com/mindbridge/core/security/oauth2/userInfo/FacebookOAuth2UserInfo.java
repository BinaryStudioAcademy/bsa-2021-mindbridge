<<<<<<< HEAD
package com.mindbridge.core.security.oauth2.userInfo;

import java.util.Map;

public class FacebookOAuth2UserInfo extends OAuth2UserInfo {

	public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getNickname() {
		return (String) attributes.get("name");
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getAvatarUrl() {
		// not sure if it works
		return (String) attributes.get("picture");
	}

}
=======
package com.mindbridge.core.security.oauth2.userInfo;

import java.util.Map;

public class FacebookOAuth2UserInfo extends OAuth2UserInfo {
	public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getNickname() {
		return (String) attributes.get("name");
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getAvatarUrl() {
		// not sure if it works
		return (String) attributes.get("picture");
	}
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
