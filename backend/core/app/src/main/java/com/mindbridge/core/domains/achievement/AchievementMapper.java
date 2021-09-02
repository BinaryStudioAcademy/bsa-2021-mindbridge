package com.mindbridge.core.domains.achievement;

import com.mindbridge.core.domains.achievement.dto.AchievementDto;
import com.mindbridge.data.domains.achievement.model.Achievement;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AchievementMapper {
	AchievementMapper MAPPER = Mappers.getMapper(AchievementMapper.class);

	AchievementDto achievementToAchievementDto(Achievement achievement);

}
