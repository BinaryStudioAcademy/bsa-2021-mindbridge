package com.mindbridge.core.domains.achievement;

import com.mindbridge.core.domains.achievement.dto.AchievementToUserDto;
import com.mindbridge.data.domains.achievement.model.Achievement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AchievementMapper {

	AchievementMapper MAPPER = Mappers.getMapper(AchievementMapper.class);

	@Mapping(target = "hasAchievement", ignore = true)
	AchievementToUserDto achievementToAchievementToUserDto(Achievement achievement);

}
