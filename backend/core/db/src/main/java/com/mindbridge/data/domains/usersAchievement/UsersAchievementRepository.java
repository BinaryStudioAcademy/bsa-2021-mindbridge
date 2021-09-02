package com.mindbridge.data.domains.usersAchievement;

import com.mindbridge.data.domains.achievement.model.Achievement;
import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;
import org.springframework.data.jpa.repository.Query;

public interface UsersAchievementRepository
		extends JpaRepository<UsersAchievement, UUID>, JpaSpecificationExecutor<UsersAchievement> {

	Optional<UsersAchievement> findByUserIdAndAchievementId(UUID id, UUID achievementId);

	List<UsersAchievement> findByUserId(UUID id);
}
