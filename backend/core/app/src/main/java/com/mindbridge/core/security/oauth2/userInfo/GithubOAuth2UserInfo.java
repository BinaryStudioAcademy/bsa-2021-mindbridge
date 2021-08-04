<<<<<<< HEAD
package com.mindbridge.core.security.oauth2.userInfo;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo {

	public GithubOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getNickname() {
		return (String) attributes.get("login");
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getAvatarUrl() {
		return (String) attributes.get("avatar_url");
	}

}
=======
package com.mindbridge.core.security.oauth2.userInfo;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo {
	public GithubOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getNickname() {
		return (String) attributes.get("login");
	}

	@Override
	public String getEmail() {
		return (String) attributes.get("email");
	}

	@Override
	public String getAvatarUrl() {
		return (String) attributes.get("avatar_url");
	}
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
