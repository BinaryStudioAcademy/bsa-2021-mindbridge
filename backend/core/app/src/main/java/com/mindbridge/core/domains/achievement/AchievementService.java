package com.mindbridge.core.domains.achievement;

import com.mindbridge.core.domains.achievement.dto.AchievementDto;
import com.mindbridge.data.domains.usersAchievement.UsersAchievementRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class AchievementService {
	private final UsersAchievementRepository usersAchievementRepository;

	public AchievementService(UsersAchievementRepository usersAchievementRepository){
		this.usersAchievementRepository = usersAchievementRepository;
	}

	public List<AchievementDto> getAllByUserId(UUID id) {
		return usersAchievementRepository.findAllByUserId(id)
			.stream()
			.map(AchievementMapper.MAPPER::achievementToAchievementDto)
			.collect(Collectors.toList());
	}
}
