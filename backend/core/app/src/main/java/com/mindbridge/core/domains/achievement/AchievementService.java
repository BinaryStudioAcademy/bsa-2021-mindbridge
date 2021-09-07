package com.mindbridge.core.domains.achievement;

import com.mindbridge.core.domains.achievement.dto.AchievementToUserDto;
import com.mindbridge.data.domains.achievement.AchievementRepository;
import com.mindbridge.data.domains.achievement.model.Achievement;
import com.mindbridge.data.domains.usersAchievement.UsersAchievementRepository;
import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class AchievementService {
	private final UsersAchievementRepository usersAchievementRepository;
	private final AchievementRepository achievementRepository;

	public AchievementService(UsersAchievementRepository usersAchievementRepository,
		AchievementRepository achievementRepository){
		this.usersAchievementRepository = usersAchievementRepository;
		this.achievementRepository = achievementRepository;
	}

	public List<AchievementToUserDto> getAllByUserId(UUID id) {
		List<Achievement> userHasAchievements =
			usersAchievementRepository.findByUserIdOrderByCreatedAtDesc(id)
			.stream()
			.map(UsersAchievement::getAchievement)
			.collect(Collectors.toList());

		List<Achievement> userHasNotAchievements =
			achievementRepository.getAllOrderByType()
				.stream()
				.filter(achievement -> !userHasAchievements.contains(achievement))
				.collect(Collectors.toList());

		List<AchievementToUserDto> usersAchievements = new ArrayList<>();

		userHasAchievements.stream()
			.map(AchievementMapper.MAPPER::achievementToAchievementToUserDto)
			.peek(achievementToUserDto -> achievementToUserDto.setHasAchievement(true))
			.forEach(usersAchievements::add);
		userHasNotAchievements.stream()
			.map(AchievementMapper.MAPPER::achievementToAchievementToUserDto)
			.peek(achievementToUserDto -> achievementToUserDto.setHasAchievement(false))
			.forEach(usersAchievements::add);

		return usersAchievements;
	}
}
