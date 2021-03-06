package com.mindbridge.data.domains.commentReaction;

import com.mindbridge.data.domains.commentReaction.model.CommentReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommentReactionRepository
		extends JpaRepository<CommentReaction, UUID>, JpaSpecificationExecutor<CommentReaction> {

	@Query("SELECT COALESCE(SUM(CASE WHEN cr.liked = TRUE THEN 1 ELSE -1 END), 0) FROM CommentReaction cr WHERE cr.comment.id = :id")
	long calcCommentRating(@Param("id") UUID id);

	@Query("SELECT COALESCE(SUM(CASE WHEN cr.liked = TRUE THEN 1 ELSE -1 END), 0) FROM CommentReaction cr WHERE cr.comment.author.id = :userId")
	long calcUserCommentRating(@Param("userId") UUID userId);

	@Query("SELECT c " + "FROM CommentReaction c " + "WHERE c.author.id= :userId AND c.comment.id = :commentId ")
	Optional<CommentReaction> getCommentReaction(UUID userId, UUID commentId);

	List<CommentReaction> getCommentReactionByAuthorId(UUID id);

}
