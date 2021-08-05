package com.mindbridge.data.domains.post;

import com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult;
import com.mindbridge.data.domains.post.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.UUID;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, UUID>, JpaSpecificationExecutor<Post> {

	@Query("SELECT new com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult("
			+ "(SELECT COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE 0 END), 0) FROM p.reactions pr WHERE pr.post = p ), "
			+ "(SELECT COALESCE(SUM(CASE WHEN pr.liked = FALSE THEN 1 ELSE 0 END), 0) FROM p.reactions pr WHERE pr.post = p ))"
			+ "FROM Post p where p.id = :id")
	PostsReactionsQueryResult getAllReactionsOnPost(UUID id);

	@Query(value = "select * from posts p where p.deleted = false", nativeQuery = true)
	List<Post> getAllPosts(Pageable pageable);

	int countPostByAuthorId(UUID id);
}
