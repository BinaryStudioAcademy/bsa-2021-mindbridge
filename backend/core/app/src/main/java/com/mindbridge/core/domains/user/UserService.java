package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.UserProfileDto;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
@Slf4j
public class UserService {

	private final UserRepository userRepository;

	private final FollowerRepository followerRepository;

	private final PostRepository postRepository;

	public static final String PHONE_REGEX = "^\\d{10}$";

	public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z].{2})(?=.*[A-Z])(?=\\S+$).{8,40}$";

	@Lazy
	@Autowired
	public UserService(UserRepository userRepository, FollowerRepository followerRepository,
			PostRepository postRepository) {
		this.userRepository = userRepository;
		this.followerRepository = followerRepository;
		this.postRepository = postRepository;
	}

	public UserProfileDto getQuantityOfUsers(UUID userId) {
		Random random = new Random();
		var user = UserProfileDto.fromEntity(userRepository.findById(userId).get());
		user.setFollowersQuantity(followerRepository.countFollowerByFollowedId(userId));
		user.setPostsQuantity(postRepository.countPostByAuthorId(userId));
		user.setRating(random.nextInt(100));
		return user;
	}

}
