package com.mindbridge.core.security.oauth2;

import com.mindbridge.core.security.oauth2.userInfo.OAuth2UserInfo;
import com.mindbridge.core.security.oauth2.userInfo.OAuth2UserInfoFactory;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class OAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	private final OAuth2UserInfoFactory oAuth2UserInfoFactory;

	public OAuth2UserService(UserRepository userRepository, OAuth2UserInfoFactory oAuth2UserInfoFactory) {
		this.userRepository = userRepository;
		this.oAuth2UserInfoFactory = oAuth2UserInfoFactory;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		var oAuth2User = super.loadUser(userRequest);
		processOauth2Request(userRequest, oAuth2User);
		return oAuth2User;
	}

	private void processOauth2Request(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
		var oauth2Provider = userRequest.getClientRegistration().getRegistrationId();
		var oAuth2UserInfo = oAuth2UserInfoFactory.getOAuth2UserInfo(oauth2Provider, oAuth2User.getAttributes());
		var foundUser = userRepository.findByEmail(oAuth2UserInfo.getEmail());
		if (foundUser.isPresent()) {
			updateUser(foundUser.get(), oAuth2UserInfo);
		}
		else {
			createNewUser(oAuth2UserInfo);
		}
	}

	private void updateUser(User user, OAuth2UserInfo oAuth2UserInfo) {
		if (user.getNickname() == null) {
			user.setNickname(oAuth2UserInfo.getNickname());
		}
		if (user.getAvatar() == null) {
			user.setAvatar(oAuth2UserInfo.getAvatarUrl());
		}
		if (user.getFirstName() == null) {
			user.setFirstName(oAuth2UserInfo.getFirstName());
		}
		if (user.getLastName() == null) {
			user.setLastName(oAuth2UserInfo.getLastName());
		}
	}

	private void createNewUser(OAuth2UserInfo oAuth2UserInfo) {
		User newUser = new User();
		newUser.setNickname(oAuth2UserInfo.getNickname());
		newUser.setEmail(oAuth2UserInfo.getEmail());
		newUser.setAvatar(oAuth2UserInfo.getAvatarUrl());
		newUser.setFirstName(oAuth2UserInfo.getFirstName());
		newUser.setLastName(oAuth2UserInfo.getLastName());
		newUser.setEmailVerified(true);
		userRepository.save(newUser);
	}

}
