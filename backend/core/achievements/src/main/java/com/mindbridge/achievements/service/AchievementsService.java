package com.mindbridge.achievements.service;

import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.domains.usersAchievement.UsersAchievementRepository;
import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
import com.mindbridge.data.domains.achievement.AchievementRepository;
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

		private final PostRepository postRepository;
		private final UsersAchievementRepository usersAchievementRepository;
		private final AchievementRepository achievementRepository;
		private final UserRepository userRepository;

		@Autowired
		public AchievementsService(PostRepository postRepository,
			UsersAchievementRepository userAchievementRepository,
			AchievementRepository achievementRepository, UserRepository userRepository){
			this.postRepository = postRepository;
			this.usersAchievementRepository = userAchievementRepository;
			this.achievementRepository = achievementRepository;
			this.userRepository = userRepository;
		}

		//@Scheduled(cron = "0 0 21 * * *", zone = "Europe/Moscow")
		@Scheduled(fixedDelay = 2 * 1000)
		public void checkAchievementsForAllUsers(){
			List<User> allUsers = userRepository.findAll();
			allUsers.stream().parallel().forEach(this::checkPostCount);
		}

		private void checkPostCount(User user) {
			int postCount = postRepository.countPostByAuthorId(user.getId());
			if(postCount > 5 && postCount < 10){
				addAchievementToUser(WRITER_LEVEL1, user);
			} else if(postCount >= 10 && postCount < 50){
				addAchievementToUser(WRITER_LEVEL2, user);
			} else if(postCount >= 50 && postCount < 100){
				addAchievementToUser(WRITER_LEVEL3, user);
			} else if(postCount >= 100){
				addAchievementToUser(WRITER_LEVEL4, user);
			}
		}

		private void addAchievementToUser(UUID achievementId, User user){
			if(!usersAchievementRepository.findByUserIdAndAchievementId(user.getId(), achievementId)){
				usersAchievementRepository.save(
					new UsersAchievement(user, achievementRepository.getOne(achievementId)));
			}

		}
}
