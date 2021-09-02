package com.mindbridge.data.domains.usersAchievement;

import com.mindbridge.data.domains.usersAchievement.model.UsersAchievement;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface UsersAchievementRepository
		extends JpaRepository<UsersAchievement, UUID>, JpaSpecificationExecutor<UsersAchievement> {

	Optional<UsersAchievement> findByUserIdAndAchievementId(UUID id, UUID achievementId);

}
