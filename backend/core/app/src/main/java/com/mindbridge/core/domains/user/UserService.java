package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.postReaction.dto.UserReactionsDto;
import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.domains.user.dto.UserProfileDataDto;
import com.mindbridge.core.domains.user.dto.UserProfileDto;
import com.mindbridge.core.exceptions.custom.EmailNotFoundException;
import com.mindbridge.core.exceptions.custom.IdNotFoundException;
import com.mindbridge.core.exceptions.custom.NicknameNotFoundException;
import com.mindbridge.core.security.PasswordConfig;
import com.mindbridge.core.security.auth.UserPrincipal;
import com.mindbridge.core.security.auth.dto.RegistrationRequest;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.postReaction.PostReactionRepository;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;

	private final FollowerRepository followerRepository;

	private final PostRepository postRepository;

	private final PasswordEncoder passwordEncoder;

	private final PostReactionRepository postReactionRepository;

	private final Random random = new Random();

	public static final String PHONE_REGEX = "^\\d{10}$";

	public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z].{2})(?=.*[A-Z])(?=\\S+$).{8,40}$";

	@Lazy
	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
					   FollowerRepository followerRepository, PostRepository postRepository, PostReactionRepository postReactionRepository) {
		this.userRepository = userRepository;
		this.postReactionRepository = postReactionRepository;
		this.passwordEncoder = new PasswordConfig().passwordEncoder();
		this.followerRepository = followerRepository;
		this.postRepository = postRepository;
	}

	public UserProfileDto getUserProfileInformation(UUID userId) {
		var user = UserMapper.MAPPER.userToUserProfileDto(userRepository.findById(userId).orElseThrow());
		var userReactions = postReactionRepository.getPostReactionByAuthorId(userId);
		user.setUserReactions(userReactions.stream().map(UserReactionsDto::fromEntity).collect(Collectors.toList()));
		user.setFollowersQuantity(followerRepository.countFollowerByFollowedId(userId));
		user.setRating(random.nextInt(100));
		return user;
	}

	public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new EmailNotFoundException("User with email : " + email + " not found."));
		return new UserPrincipal(user);
	}

	public UserDto loadUserDtoByEmail(String email) throws UsernameNotFoundException {
		return userRepository.findByEmail(email).map(UserMapper.MAPPER::userToUserDto).get();
	}

	public void registerNewUserAccount(RegistrationRequest registrationRequest) {
		User user = new User();
		user.setFirstName(registrationRequest.getName());
		user.setLastName(registrationRequest.getSurname());
		user.setNickname(registrationRequest.getNickname());
		user.setEmail(registrationRequest.getEmail());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setEmailVerified(false);
		userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
		User user = userRepository.findByNickname(nickname)
				.orElseThrow(() -> new NicknameNotFoundException("User with nickname : " + nickname + " not found."));
		return new UserPrincipal(user);
	}

	public UserDto updateUserById(UUID id, UserProfileDataDto userProfileData) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new IdNotFoundException("User with id : " + id + " not found."));
		user.setNickname(userProfileData.getNickname());
		user.setFirstName(userProfileData.getFirstName());
		user.setLastName(userProfileData.getLastName());
		userRepository.save(user);

		return loadUserDtoByEmail(user.getEmail());
	}

	public boolean checkNickname(String nickname) {
		return userRepository.existsByNickname(nickname);
	}

	public boolean checkPassword(UUID id, String password) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new IdNotFoundException("User with id : " + id + " not found."));
		return passwordEncoder.matches(password.substring(0, password.length() - 1), user.getPassword());
	}

	public UserDto updateUserAvatarById(UUID id, String url) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new IdNotFoundException("User with id : " + id + " not found."));
		String result = URLDecoder.decode( url, StandardCharsets.UTF_8);
		String rigth_url = result.substring(0, result.length() - 1);
		user.setAvatar(rigth_url);
		userRepository.save(user);

		return loadUserDtoByEmail(user.getEmail());
	}

	public UserDto updateUserPasswordById(UUID id, String newPassword) {
		User user = userRepository.findById(id)
			.orElseThrow(() -> new IdNotFoundException("User with id : " + id + " not found."));
		user.setPassword(passwordEncoder.encode(newPassword.substring(0, newPassword.length() - 1)));
		userRepository.save(user);

		return loadUserDtoByEmail(user.getEmail());
	}
}
