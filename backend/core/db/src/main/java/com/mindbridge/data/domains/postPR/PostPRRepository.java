package com.mindbridge.data.domains.postPR;

import com.mindbridge.data.domains.postPR.model.PostPR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PostPRRepository extends JpaRepository<PostPR, UUID>, JpaSpecificationExecutor<PostPR> {
	@Transactional
	@Modifying
	@Query("update PostPR pr set pr.closed = true where pr.id = :id")
	void setPRClosed(@Param("id") UUID id);

	int countPostPRByContributorId(UUID id);
}
