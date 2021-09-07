package com.mindbridge.core.domains.user;
import com.mindbridge.core.domains.commentReaction.dto.UserReactionsCommentsDto;
import com.mindbridge.core.domains.helpers.mailSender.MailSender;
import com.mindbridge.core.domains.notification.NotificationService;
import com.mindbridge.core.domains.user.dto.*;
import com.mindbridge.data.domains.commentReaction.CommentReactionRepository;
import com.mindbridge.data.domains.notification.model.Notification;
import com.mindbridge.data.domains.post.dto.PostTitleDto;
import com.mindbridge.core.domains.postReaction.dto.UserReactionsDto;
import com.mindbridge.core.exceptions.custom.EmailNotFoundException;
import com.mindbridge.core.exceptions.custom.IdNotFoundException;
import com.mindbridge.core.exceptions.custom.NicknameNotFoundException;
import com.mindbridge.core.security.PasswordConfig;
import com.mindbridge.core.security.auth.UserPrincipal;
import com.mindbridge.core.security.auth.dto.RegistrationRequest;
import com.mindbridge.data.domains.comment.CommentRepository;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.postPR.PostPRRepository;
import com.mindbridge.data.domains.postReaction.PostReactionRepository;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;

	private final CommentRepository commentRepository;

	private final FollowerRepository followerRepository;

	private final PostRepository postRepository;

	private final PostPRRepository postPRRepository;

	private final PasswordEncoder passwordEncoder;

	private final PostReactionRepository postReactionRepository;

	private final CommentReactionRepository commentReactionRepository;

	private final NotificationService notificationService;

	private final MailSender mailSender;

	private final Random random = new Random();

	public static final String PHONE_REGEX = "^\\d{10}$";

	public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z].{2})(?=.*[A-Z])(?=\\S+$).{8,40}$";

	@Value("${app.domain.name}")
	private String appDomain;

	@Lazy
	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, NotificationService notificationService,
			CommentRepository commentRepository, FollowerRepository followerRepository, PostRepository postRepository,
			PostPRRepository postPRRepository, PostReactionRepository postReactionRepository,
			CommentReactionRepository commentReactionRepository, MailSender mailSender) {
		this.userRepository = userRepository;
		this.commentRepository = commentRepository;
		this.postPRRepository = postPRRepository;
		this.postReactionRepository = postReactionRepository;
		this.mailSender = mailSender;
		this.notificationService = notificationService;
		this.passwordEncoder = new PasswordConfig().passwordEncoder();
		this.followerRepository = followerRepository;
		this.postRepository = postRepository;
		this.commentReactionRepository = commentReactionRepository;
	}

	public UserProfileDto getUserProfileInformation(UUID userId, Principal principal) {
		var foundUser = userRepository.findById(userId)
				.orElseThrow(() -> new IdNotFoundException("User with id : " + userId + " not found."));
		var user = UserMapper.MAPPER.userToUserProfileDto(foundUser);
		var userReactions = postReactionRepository.getPostReactionByAuthorId(userId);
		var userCommentReactions = commentReactionRepository.getCommentReactionByAuthorId(userId);
		List<Post> top5Posts = postRepository.getFirstPostTitles(userId, PageRequest.of(0, 5));
		user.setCommentsQuantity(commentRepository.countCommentByAuthorId(userId));
		user.setPostsQuantity(postRepository.countPostByAuthorId(userId));
		user.setContributionsQuantity(postPRRepository.countPostPRByContributorId(userId));
		user.setUserReactions(userReactions.stream().map(UserReactionsDto::fromEntity).collect(Collectors.toList()));
		user.setUserReactionsComments(
				userCommentReactions.stream().map(UserReactionsCommentsDto::fromEntity).collect(Collectors.toList()));
		user.setFollowersQuantity(followerRepository.countFollowerByFollowedId(userId));
		user.setLastArticleTitles(top5Posts.stream().map(PostTitleDto::fromEntity).collect(Collectors.toList()));
		long rating = postReactionRepository.calcUserPostRating(userId)
				+ (commentReactionRepository.calcUserCommentRating(userId) / 2);
		user.setRating(rating);
		if (principal == null) {
			return user;
		}
		var currentUser = loadUserDtoByEmail(principal.getName());
		var follower = followerRepository.findFollowerByFollowerAndFollowed(currentUser.getId(), userId);
		user.setFollowed(follower.isPresent());

		return user;
	}

	public UserShortDto getUserById(UUID id) {
		return UserMapper.MAPPER.userToUserShortDto(userRepository.findById(id).orElseThrow());
	}

	public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new EmailNotFoundException("User with email : " + email + " not found."));
		return new UserPrincipal(user);
	}

	public UserDto loadUserDtoByEmail(String email) throws UsernameNotFoundException {
		return userRepository.findByEmail(email).map(UserMapper.MAPPER::userToUserDto).get();
	}

	public UserDto loadUserDtoByNickname(String nickname) throws UsernameNotFoundException {
		return userRepository.findByNickname(nickname).map(UserMapper.MAPPER::userToUserDto).get();
	}

	public void registerNewUserAccount(RegistrationRequest registrationRequest) {
		User user = new User();
		user.setFirstName(registrationRequest.getName());
		user.setLastName(registrationRequest.getSurname());
		user.setNickname(registrationRequest.getNickname());
		user.setEmail(registrationRequest.getEmail());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setActivationCode(UUID.randomUUID().toString());
		userRepository.save(user);

		String message = String.format(
			"Dear %s! \n" +
				"You successfully registration on MindBridge \n" +
				"\n" +
				"please follow the link to activate your account: "+ "%s" +"activate/%s" +
				"\n" +
				"\n" +
				"Best regards, MindBride administration",
			user.getNickname(),
			appDomain,
			user.getActivationCode()
		);
		mailSender.sendEmail(user.getEmail(), "Thank you for registration on MindBridge", message);
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

	public void followUser(FollowDto followDto, Principal principal) {
		if (principal == null) {
			return;
		}
		String currentEmail  = principal.getName();
		var currentUser = loadUserDtoByEmail(currentEmail);
		var follower = followerRepository.findFollowerByFollowerAndFollowed(currentUser.getId(), followDto.getFollowedId());
		if (follower.isPresent()) {
			followerRepository.delete(follower.get());
		} else {
			followerRepository.save(UserMapper.MAPPER.FollowDtoToFollower(followDto));
			notificationService.createNotification(
				followDto.getFollowedId(),
				currentUser.getNickname(),
				currentUser.getId(),
				Notification.Type.newFollower);
		}
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
		String result = URLDecoder.decode(url, StandardCharsets.UTF_8);
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

	public UserDto deleteUserAvatar(UUID id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new IdNotFoundException("User with id : " + id + " not found."));
		user.setAvatar(null);
		userRepository.save(user);

		return loadUserDtoByEmail(user.getEmail());
	}

	public List<UserMentionsDto> getAllUser(String nickname) {
		var nicknameWithoutAtSign = nickname.substring(0, 0);
		var allUser = userRepository.findAllByNicknameIsContaining(nicknameWithoutAtSign);
		return allUser.stream().map(UserMapper.MAPPER::userToUserMentionsDto).collect(Collectors.toList());
	}

}
