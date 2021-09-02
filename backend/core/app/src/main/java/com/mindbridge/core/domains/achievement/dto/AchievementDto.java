package com.mindbridge.core.domains.achievement.dto;

import java.util.UUID;
import lombok.Data;

@Data
public class AchievementDto {
	private UUID id;

	private String text;

	private String title;

	private String type;

	private Integer level;
}
