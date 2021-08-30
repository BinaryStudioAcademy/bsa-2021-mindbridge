package com.mindbridge.data.domains.postReaction;

import com.mindbridge.data.domains.postReaction.model.PostReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface PostReactionRepository
		extends JpaRepository<PostReaction, UUID>, JpaSpecificationExecutor<PostReaction> {

	@Query("SELECT COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0) FROM PostReaction pr WHERE pr.post.id = :id")
	long calcPostRating(@Param("id") UUID id);

	@Query("SELECT r " + "FROM PostReaction r " + "WHERE r.author.id = :userId AND r.post.id = :postId ")
	Optional<PostReaction> getPostReaction(@Param("userId") UUID userId, @Param("postId") UUID postId);

	List<PostReaction> getPostReactionByAuthorId(UUID id);

	@Query("SELECT COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0) FROM PostReaction pr WHERE pr.post.author.id = :userId")
	long calcUserPostRating(@Param("userId") UUID userId);

}
