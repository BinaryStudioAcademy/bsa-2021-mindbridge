package com.mindbridge.core.domains.achievement;

import com.mindbridge.core.domains.achievement.dto.AchievementToUserDto;
import java.util.List;
import java.util.UUID;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("achievement")
@Validated
public class AchievementController {
	private final AchievementService achievementService;

	public AchievementController(AchievementService achievementService){
		this.achievementService = achievementService;
	}

	@GetMapping("/byUser/{id}")
	public List<AchievementToUserDto> getAllByUserId(@PathVariable UUID id){
		return achievementService.getAllByUserId(id);
	}
}
