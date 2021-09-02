package com.mindbridge.achievements.service;

import com.mindbridge.data.domains.achievement.AchievementRepository;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.postPR.PostPRRepository;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.domains.usersAchievement.UsersAchievementRepository;
import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class AchievementsService {

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
	private final UUID AWESOME_LEVEL1 = UUID.fromString("8055d036-d9d7-47fb-ac6e-afb44bdd7dd4");
	private final UUID AWESOME_LEVEL2 = UUID.fromString("e43f32b7-53c5-49f5-a802-def005442e91");
	private final UUID AWESOME_LEVEL3 = UUID.fromString("38a2aa80-78ac-49fe-af03-750c956adcec");
	private final UUID AWESOME_LEVEL4 = UUID.fromString("27d27383-230a-427f-be68-2895cedb34b8");
	private final UUID TIME_LEVEL1 = UUID.fromString("1d1a158f-bda4-4083-a38f-22265d35abe5");
	private final UUID TIME_LEVEL2 = UUID.fromString("36bfa8b9-a1ba-430b-9f4b-5ceaebc4d878");
	private final UUID TIME_LEVEL3 = UUID.fromString("ab1f68c2-186a-4b37-bbc2-ebb1670605a6");
	private final UUID TIME_LEVEL4 = UUID.fromString("8b6c07b0-fc5d-4914-a584-6738d5bcf963");


	private final PostRepository postRepository;
	private final UsersAchievementRepository usersAchievementRepository;
	private final AchievementRepository achievementRepository;
	private final UserRepository userRepository;
	private final FollowerRepository followerRepository;
	private final PostPRRepository postPRRepository;

	@Autowired
	public AchievementsService(PostRepository postRepository,
		UsersAchievementRepository userAchievementRepository,
		AchievementRepository achievementRepository, UserRepository userRepository,
		FollowerRepository followerRepository, PostPRRepository postPRRepository) {
		this.postRepository = postRepository;
		this.usersAchievementRepository = userAchievementRepository;
		this.achievementRepository = achievementRepository;
		this.userRepository = userRepository;
		this.followerRepository = followerRepository;
		this.postPRRepository = postPRRepository;
	}

	//@Scheduled(cron = "0 0 2 * * *", zone = "Europe/Moscow")
	@Scheduled(fixedDelay = 2 * 1000)
	public void checkAchievementsForAllUsers() {
		List<User> allUsers = userRepository.findAll();
		allUsers.stream().parallel().forEach(this::checkPostCount);
		allUsers.stream().parallel().forEach(this::checkFollowersCount);
		allUsers.stream().parallel().forEach(this::checkAcceptedPRsCount);
		allUsers.stream().parallel().forEach(this::checkCoolPostsAndCommentsCount);
		checkTime();
	}

	private void checkTime() {
		List<User> oneYearUsers = userRepository.getUsersByOneYearAfterRegistration();
		oneYearUsers.stream().parallel().forEach(user -> usersAchievementRepository.save(
			new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL1))));
		List<User> twoYearsUsers = userRepository.getUsersByTwoYearsAfterRegistration();
		twoYearsUsers.stream().parallel().forEach(user -> usersAchievementRepository.save(
			new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL2))));
		List<User> threeYearsUsers = userRepository.getUsersByThreeYearsAfterRegistration();
		threeYearsUsers.stream().parallel().forEach(user -> usersAchievementRepository.save(
			new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL3))));
		List<User> fiveYearsUsers = userRepository.getUsersByFiveYearsAfterRegistration();
		fiveYearsUsers.stream().parallel().forEach(user -> usersAchievementRepository.save(
			new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL4))));
	}

	private void checkPostCount(User user) {
		int postCount = postRepository.countPostByAuthorId(user.getId());
		if (postCount > 5 && postCount < 10) {
			addAchievementToUser(WRITER_LEVEL1, user);
		} else if (postCount >= 10 && postCount < 50) {
			addAchievementToUser(WRITER_LEVEL2, user);
		} else if (postCount >= 50 && postCount < 100) {
			addAchievementToUser(WRITER_LEVEL3, user);
		} else if (postCount >= 100) {
			addAchievementToUser(WRITER_LEVEL4, user);
		}
	}

	private void checkFollowersCount(User user) {
		int followersCount = followerRepository.countFollowerByFollowedId(user.getId());
		if (followersCount > 50 && followersCount < 100) {
			addAchievementToUser(SUBSCRIBERS_LEVEL1, user);
		} else if (followersCount >= 100 && followersCount < 500) {
			addAchievementToUser(SUBSCRIBERS_LEVEL2, user);
		} else if (followersCount >= 500 && followersCount < 1000) {
			addAchievementToUser(SUBSCRIBERS_LEVEL3, user);
		} else if (followersCount >= 1000) {
			addAchievementToUser(SUBSCRIBERS_LEVEL4, user);
		}
	}

	private void checkAcceptedPRsCount(User user) {
		int acceptedPRsCount = postPRRepository.countAcceptedPostPRByContributorId(user.getId());
		if (acceptedPRsCount > 5 && acceptedPRsCount < 10) {
			addAchievementToUser(CONTRIBUTOR_LEVEL1, user);
		} else if (acceptedPRsCount >= 10 && acceptedPRsCount < 50) {
			addAchievementToUser(CONTRIBUTOR_LEVEL2, user);
		} else if (acceptedPRsCount >= 50 && acceptedPRsCount < 100) {
			addAchievementToUser(CONTRIBUTOR_LEVEL3, user);
		} else if (acceptedPRsCount >= 100) {
			addAchievementToUser(CONTRIBUTOR_LEVEL4, user);
		}
	}

	private void checkCoolPostsAndCommentsCount(User user) {
		long coolPostsCount = userRepository.countCoolPostsByAuthor(user.getId());
		long coolCommentsCount = userRepository.countCoolCommentsByAuthor(user.getId());
		long sum = coolPostsCount + coolCommentsCount;

		if (sum > 5 && sum < 10) {
			addAchievementToUser(AWESOME_LEVEL1, user);
		} else if (sum >= 10 && sum < 50) {
			addAchievementToUser(AWESOME_LEVEL2, user);
		} else if (sum >= 50 && sum < 100) {
			addAchievementToUser(AWESOME_LEVEL3, user);
		} else if (sum >= 100) {
			addAchievementToUser(AWESOME_LEVEL4, user);
		}
	}

	private void addAchievementToUser(UUID achievementId, User user) {
		if (!usersAchievementRepository.findByUserIdAndAchievementId(user.getId(), achievementId)) {
			usersAchievementRepository.save(
				new UsersAchievement(user, achievementRepository.getOne(achievementId)));
		}
	}
}
