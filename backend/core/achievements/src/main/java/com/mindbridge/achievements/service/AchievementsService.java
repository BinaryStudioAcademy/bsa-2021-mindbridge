package com.mindbridge.achievements.service;

import com.mindbridge.core.domains.notification.NotificationService;
import com.mindbridge.data.domains.achievement.AchievementRepository;
import com.mindbridge.data.domains.notification.model.Notification;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.domains.usersAchievement.UsersAchievementRepository;
import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class AchievementsService {

	private final UUID AWESOME_LEVEL1 = UUID.fromString("8055d036-d9d7-47fb-ac6e-afb44bdd7dd4");

	private final UUID AWESOME_LEVEL2 = UUID.fromString("e43f32b7-53c5-49f5-a802-def005442e91");

	private final UUID AWESOME_LEVEL3 = UUID.fromString("38a2aa80-78ac-49fe-af03-750c956adcec");

	private final UUID AWESOME_LEVEL4 = UUID.fromString("27d27383-230a-427f-be68-2895cedb34b8");

	private final UUID TIME_LEVEL1 = UUID.fromString("1d1a158f-bda4-4083-a38f-22265d35abe5");

	private final UUID TIME_LEVEL2 = UUID.fromString("36bfa8b9-a1ba-430b-9f4b-5ceaebc4d878");

	private final UUID TIME_LEVEL3 = UUID.fromString("ab1f68c2-186a-4b37-bbc2-ebb1670605a6");

	private final UUID TIME_LEVEL4 = UUID.fromString("8b6c07b0-fc5d-4914-a584-6738d5bcf963");

	private final UsersAchievementRepository usersAchievementRepository;

	private final AchievementRepository achievementRepository;

	private final UserRepository userRepository;

	private final NotificationService notificationService;

	@Autowired
	public AchievementsService(UsersAchievementRepository userAchievementRepository, NotificationService notificationService,
			AchievementRepository achievementRepository, UserRepository userRepository) {
		this.usersAchievementRepository = userAchievementRepository;
		this.achievementRepository = achievementRepository;
		this.userRepository = userRepository;
		this.notificationService = notificationService;
	}

	@Scheduled(cron = "${start.cron}", zone = "Europe/Moscow")
	public void checkAchievementsForAllUsers() {
		List<User> allUsers = userRepository.findAll();
		allUsers.stream().parallel().forEach(this::checkCoolPostsAndCommentsCount);
		checkTime();
	}

	private void checkTime() {
		List<User> oneYearUsers = userRepository.getUsersByOneYearAfterRegistration();
		oneYearUsers.stream().parallel().forEach(user -> usersAchievementRepository
				.save(new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL1))));
		List<User> twoYearsUsers = userRepository.getUsersByTwoYearsAfterRegistration();
		twoYearsUsers.stream().parallel().forEach(user -> usersAchievementRepository
				.save(new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL2))));
		List<User> threeYearsUsers = userRepository.getUsersByThreeYearsAfterRegistration();
		threeYearsUsers.stream().parallel().forEach(user -> usersAchievementRepository
				.save(new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL3))));
		List<User> fiveYearsUsers = userRepository.getUsersByFiveYearsAfterRegistration();
		fiveYearsUsers.stream().parallel().forEach(user -> usersAchievementRepository
				.save(new UsersAchievement(user, achievementRepository.getOne(TIME_LEVEL4))));
	}

	private void checkCoolPostsAndCommentsCount(User user) {
		long coolPostsCount = userRepository.countCoolPostsByAuthor(user.getId());
		long coolCommentsCount = userRepository.countCoolCommentsByAuthor(user.getId());
		long sum = coolPostsCount + coolCommentsCount;

		if (sum >= 1 && sum < 5) {
			addAchievementToUser(AWESOME_LEVEL1, user);
		}
		else if (sum >= 5 && sum < 10) {
			addAchievementToUser(AWESOME_LEVEL2, user);
		}
		else if (sum >= 10 && sum < 50) {
			addAchievementToUser(AWESOME_LEVEL3, user);
		}
		else if (sum >= 50) {
			addAchievementToUser(AWESOME_LEVEL4, user);
		}
	}

	private void addAchievementToUser(UUID achievementId, User user) {
		if (usersAchievementRepository.findByUserIdAndAchievementId(user.getId(), achievementId).isEmpty()) {
			var achievement = usersAchievementRepository.save(new UsersAchievement(user, achievementRepository.getOne(achievementId)));
			notificationService.createNotification(
				user.getId(),
				achievement.getAchievement().getText(),
				achievementId,
				Notification.Type.newAchievement
			);
		}
	}

}
