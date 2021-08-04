package com.mindbridge.data.domains.postReaction;

import com.mindbridge.data.domains.postReaction.model.PostReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface PostReactionRepository
		extends JpaRepository<PostReaction, UUID>, JpaSpecificationExecutor<PostReaction> {

	@Query("SELECT COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0) FROM PostReaction pr WHERE pr.post.id = :id")
	long calcPostRating(@Param("id") UUID id);

}
