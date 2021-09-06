package com.mindbridge.data.domains.achievement;

import com.mindbridge.data.domains.achievement.model.Achievement;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;
import org.springframework.data.jpa.repository.Query;

public interface AchievementRepository extends JpaRepository<Achievement, UUID>, JpaSpecificationExecutor<Achievement> {

	@Query("Select ach from Achievement ach order by ach.type, ach.level")
	List<Achievement> getAllOrderByType();

}
