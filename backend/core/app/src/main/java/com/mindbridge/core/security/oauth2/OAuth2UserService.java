package com.mindbridge.core.security.oauth2;

import com.mindbridge.core.exceptions.custom.OAuth2NotFoundException;
import com.mindbridge.core.security.oauth2.userInfo.OAuth2UserInfo;
import com.mindbridge.core.security.oauth2.userInfo.OAuth2UserInfoFactory;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class OAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	public OAuth2UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		var oAuth2User = super.loadUser(userRequest);

		processUser(userRequest, oAuth2User);
		return oAuth2User;
	}

	private void processUser(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
		OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory
				.getOAuth2UserInfo(userRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());

		if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
			throw new OAuth2NotFoundException("Email not found from OAuth2 provider.");
		}
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
	}

	private void createNewUser(OAuth2UserInfo oAuth2UserInfo) {
		User newUser = new User();
		newUser.setNickname(oAuth2UserInfo.getNickname());
		newUser.setEmail(oAuth2UserInfo.getEmail());
		newUser.setAvatar(oAuth2UserInfo.getAvatarUrl());
		newUser.setEmailVerified(true);
		userRepository.save(newUser);
	}

}
