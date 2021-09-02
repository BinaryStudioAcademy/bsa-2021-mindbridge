package com.mindbridge.core.domains.achievement;

import com.mindbridge.core.domains.achievement.dto.AchievementDto;
import com.mindbridge.data.domains.achievement.AchievementRepository;
import com.mindbridge.data.domains.usersAchievement.UsersAchievementRepository;
import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
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

	public List<AchievementDto> getAllByUserId(UUID id) {
		return usersAchievementRepository.findByUserId(id)
			.stream()
			.map(UsersAchievement::getAchievement)
			.map(AchievementMapper.MAPPER::achievementToAchievementDto)
			.collect(Collectors.toList());
	}
}
