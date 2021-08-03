package com.mindbridge.data.domains.post;

import com.mindbridge.data.domains.post.dto.PostDetailsQueryResult;
import com.mindbridge.data.domains.post.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID>, JpaSpecificationExecutor<Post> {


	@Query("SELECT new com.mindbridge.data.domains.post.dto.PostDetailsQueryResult(p.id, p.createdAt, p.updatedAt, " +
		"p.title, p.text, p.author, p.tags, " +
		"(SELECT COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0) FROM p.reactions pr WHERE pr.post = p)) " +
		"FROM Post p " +
		"WHERE p.id = :id")
	Optional<PostDetailsQueryResult> findPostById(@Param("id") UUID id);
}
