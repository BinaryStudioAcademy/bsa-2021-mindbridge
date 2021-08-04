<<<<<<< HEAD
package com.mindbridge.core.security.oauth2.userInfo;

import java.util.Map;

public abstract class OAuth2UserInfo {

	protected Map<String, Object> attributes;

	public OAuth2UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public abstract String getNickname();

	public abstract String getEmail();

	public abstract String getAvatarUrl();

}
=======
package com.mindbridge.core.security.oauth2.userInfo;

import java.util.Map;

public abstract class OAuth2UserInfo {
	protected Map<String, Object> attributes;

	public OAuth2UserInfo(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public abstract String getNickname();

	public abstract String getEmail();

	public abstract String getAvatarUrl();
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
