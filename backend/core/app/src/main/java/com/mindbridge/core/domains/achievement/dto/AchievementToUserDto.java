package com.mindbridge.core.domains.achievement.dto;

import java.util.UUID;
import lombok.Data;

@Data
public class AchievementToUserDto {
	private UUID id;

	private String text;

	private String title;

	private String type;

	private Integer level;

	private boolean hasAchievement;
}
