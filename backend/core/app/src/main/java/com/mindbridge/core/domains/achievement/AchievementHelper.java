package com.mindbridge.core.domains.achievement;

import com.mindbridge.core.domains.notification.NotificationService;
import com.mindbridge.data.domains.achievement.AchievementRepository;
import com.mindbridge.data.domains.achievement.model.Achievement;
import com.mindbridge.data.domains.comment.CommentRepository;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.notification.model.Notification.Type;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.postPR.PostPRRepository;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.domains.usersAchievement.UsersAchievementRepository;
import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AchievementHelper {
	private final UUID WRITER_LEVEL1 = UUID.fromString("31ed1a82-4758-4c3c-a053-55c541f54cb3");

	private final UUID WRITER_LEVEL2 = UUID.fromString("4650f4bc-27f7-4499-8b3c-b02fc4546c49");

	private final UUID WRITER_LEVEL3 = UUID.fromString("80bf1604-f394-42ca-af1d-2ab8dc551c45");

	private final UUID WRITER_LEVEL4 = UUID.fromString("58199fcf-0dd5-42af-873b-27f5b56b34c3");

	private final UUID SUBSCRIBERS_LEVEL1 = UUID.fromString("4e437ece-cf9c-4c10-94fb-78437f1601f4");

	private final UUID SUBSCRIBERS_LEVEL2 = UUID.fromString("8e1ee7fa-6cec-42d5-a976-84a3cfb402fc");

	private final UUID SUBSCRIBERS_LEVEL3 = UUID.fromString("adb7a48d-684e-4bb2-a0a5-d6bfd7f7a975");

	private final UUID SUBSCRIBERS_LEVEL4 = UUID.fromString("cc5b1825-248a-4b43-b722-47dc2ec78857");

	private final UUID CONTRIBUTOR_LEVEL1 = UUID.fromString("fa66480a-1409-4c1b-bbf7-0c8581131cea");

	private final UUID CONTRIBUTOR_LEVEL2 = UUID.fromString("ac1d9b68-e5cb-496f-b2f7-26608479fd46");

	private final UUID CONTRIBUTOR_LEVEL3 = UUID.fromString("236a6d66-6c5a-442f-91be-20a21863dfbc");

	private final UUID CONTRIBUTOR_LEVEL4 = UUID.fromString("e2a80576-0d66-4587-8c0d-f012e9a97c21");

	private final UUID COMMENTS_LEVEL3 = UUID.fromString("80bf1604-f394-42ca-af1d-2ab8dc551c45");

	private final UUID COMMENTS_LEVEL1 = UUID.fromString("3f0fad64-dd39-45ce-98b5-2f798497859a");

	private final UUID COMMENTS_LEVEL2 = UUID.fromString("20cb04da-afc2-4c6a-8395-a4ccc2c4080f");

	private final UUID COMMENTS_LEVEL4 = UUID.fromString("8abf84b6-2742-43fc-9c90-6aa7e98425bc");

	private final PostRepository postRepository;

	private final UsersAchievementRepository usersAchievementRepository;

	private final AchievementRepository achievementRepository;

	private final FollowerRepository followerRepository;

	private final PostPRRepository postPRRepository;

	private final NotificationService notificationService;

	private final CommentRepository commentRepository;

	private final UserRepository userRepository;

	@Autowired
	public AchievementHelper(PostRepository postRepository, UsersAchievementRepository userAchievementRepository,
		AchievementRepository achievementRepository,
		FollowerRepository followerRepository, PostPRRepository postPRRepository,
		NotificationService notificationService, CommentRepository commentRepository,
		UserRepository userRepository) {
		this.postRepository = postRepository;
		this.usersAchievementRepository = userAchievementRepository;
		this.achievementRepository = achievementRepository;
		this.followerRepository = followerRepository;
		this.postPRRepository = postPRRepository;
		this.notificationService = notificationService;
		this.commentRepository = commentRepository;
		this.userRepository = userRepository;
	}

	public void checkPostCount(User user) {
		int postCount = postRepository.countPostByAuthorId(user.getId());
		if (postCount == 1) {
			addAchievementToUser(WRITER_LEVEL1, user);
		}
		else if (postCount == 10) {
			addAchievementToUser(WRITER_LEVEL2, user);
		}
		else if (postCount == 50) {
			addAchievementToUser(WRITER_LEVEL3, user);
		}
		else if (postCount == 100) {
			addAchievementToUser(WRITER_LEVEL4, user);
		}
	}

	public void checkFollowersCount(UUID userId) {
		int followersCount = followerRepository.countFollowerByFollowedId(userId);
		if (followersCount == 1) {
			User user = userRepository.getOne(userId);
			if(hasNotAchievement(SUBSCRIBERS_LEVEL1, user)) {
				addAchievementToUser(SUBSCRIBERS_LEVEL1, user);
			}
		}
		else if (followersCount == 50) {
			User user = userRepository.getOne(userId);
			if(hasNotAchievement(SUBSCRIBERS_LEVEL2, user)) {
				addAchievementToUser(SUBSCRIBERS_LEVEL2, user);
			}
		}
		else if (followersCount == 100) {
			User user = userRepository.getOne(userId);
			if(hasNotAchievement(SUBSCRIBERS_LEVEL3, user)) {
				addAchievementToUser(SUBSCRIBERS_LEVEL3, user);
			}
		}
		else if (followersCount == 500) {
			User user = userRepository.getOne(userId);
			if(hasNotAchievement(SUBSCRIBERS_LEVEL4, user)) {
				addAchievementToUser(SUBSCRIBERS_LEVEL4, user);
			}
		}
	}

	public void checkAcceptedPRsCount(User user) {
		int acceptedPRsCount = postPRRepository.countAcceptedPostPRByContributorId(user.getId());
		if (acceptedPRsCount == 5) {
			addAchievementToUser(CONTRIBUTOR_LEVEL1, user);
		}
		else if (acceptedPRsCount == 10) {
			addAchievementToUser(CONTRIBUTOR_LEVEL2, user);
		}
		else if (acceptedPRsCount == 50) {
			addAchievementToUser(CONTRIBUTOR_LEVEL3, user);
		}
		else if (acceptedPRsCount == 100) {
			addAchievementToUser(CONTRIBUTOR_LEVEL4, user);
		}
	}

	public void checkCommentsCount(User user){
		int commentCount = commentRepository.countCommentByAuthorId(user.getId());
		if(commentCount == 10){
			addAchievementToUser(COMMENTS_LEVEL1, user);
		}
		else if(commentCount == 50){
			addAchievementToUser(COMMENTS_LEVEL2, user);
		}
		else if(commentCount == 100){
			addAchievementToUser(COMMENTS_LEVEL3, user);
		}
		else if(commentCount == 500){
			addAchievementToUser(COMMENTS_LEVEL4, user);
		}
	}

	public boolean hasNotAchievement(UUID achievementId, User user){
		return usersAchievementRepository.findByUserIdAndAchievementId(user.getId(), achievementId).isEmpty();
	}

	public void addAchievementToUser(UUID achievementId, User user) {
		Achievement achievement = achievementRepository.getOne(achievementId);
		usersAchievementRepository.save(new UsersAchievement(user, achievement));

		notificationService.createNotification(user.getId(), achievement.getTitle(), achievementId, Type.newAchievement);
	}

}
