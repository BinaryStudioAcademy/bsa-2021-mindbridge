package com.mindbridge.data.domains.achievement;

import com.mindbridge.data.domains.achievement.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface AchievementRepository extends JpaRepository<Achievement, UUID>, JpaSpecificationExecutor<Achievement> {
}
