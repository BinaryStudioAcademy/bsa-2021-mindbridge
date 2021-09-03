package com.mindbridge.core.security.oauth2.userInfo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OAuthProfileHelper {
	@Value("${app.domain.pure}")
	private String domainName;

	public String getNicknameFromEmail(String email) {
		return email.substring(0, email.indexOf('@'));
	}

	public String generateEmailFromNickname(String nickname) {
		return nickname + "@" + domainName;
	}
}
