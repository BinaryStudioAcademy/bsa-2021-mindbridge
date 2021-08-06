package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.UserProfileDto;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.core.exceptions.custom.EmailNotFoundException;
import com.mindbridge.core.security.PasswordConfig;
import com.mindbridge.core.security.auth.UserPrincipal;
import com.mindbridge.core.security.auth.dto.RegistrationRequest;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
@Slf4j
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;

	private final FollowerRepository followerRepository;

	private final PostRepository postRepository;

	private final PasswordEncoder passwordEncoder;

	public static final String PHONE_REGEX = "^\\d{10}$";

	public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z].{2})(?=.*[A-Z])(?=\\S+$).{8,40}$";

	@Lazy
	@Autowired
	public UserProfileDto getQuantityOfUsers(UUID userId) {
		Random random = new Random();
		var user = UserProfileDto.fromEntity(userRepository.findById(userId).get());
		user.setFollowersQuantity(followerRepository.countFollowerByFollowedId(userId));
		user.setPostsQuantity(postRepository.countPostByAuthorId(userId));
		user.setRating(random.nextInt(100));
		return user;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			FollowerRepository followerRepository, PostRepository postRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new PasswordConfig().passwordEncoder();
		this.followerRepository = followerRepository;
		this.postRepository = postRepository;
	}

	public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new EmailNotFoundException("User with email : " + email + " not found."));
		return new UserPrincipal(user);
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
				.orElseThrow(() -> new EmailNotFoundException("User with nickname : " + nickname + " not found."));
	}

}
