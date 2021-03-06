package com.mindbridge.data.domains.post;

import com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult;
import com.mindbridge.data.domains.post.model.Post;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID>, JpaSpecificationExecutor<Post> {

	@Query("SELECT new com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult("
			+ "(SELECT COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE 0 END), 0) FROM p.reactions pr WHERE pr.post = p ), "
			+ "(SELECT COALESCE(SUM(CASE WHEN pr.liked = FALSE THEN 1 ELSE 0 END), 0) FROM p.reactions pr WHERE pr.post = p ))"
			+ "FROM Post p where p.id = :id")
	PostsReactionsQueryResult getAllReactionsOnPost(UUID id);

	@Query("select p from Post p where p.deleted = false and p.draft = false order by p.createdAt desc ")
	List<Post> getAllPosts(Pageable pageable);

	@Query(value = "select p.* from Posts p, post_reactions pr " +
		"where p.deleted = false " +
		"and p.draft = false " +
		"and p.created_at >= current_date at time zone 'UTC' - interval '7 days' " +
		"group by p.id, p.created_at " +
		"order by (SELECT (COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0) - " +
		"(0.1 * -(date_part('day',age(p.created_at, now()))) * " +
		"abs(COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0)))) " +
		"FROM post_reactions pr WHERE pr.post_id = p.id) desc", nativeQuery = true)
	List<Post> getHotPosts(PageRequest pageable);

	@Query(value = "select p.* from Posts p " +
		"where p.deleted = false " +
		"and p.draft = false " +
		"order by (SELECT COALESCE(SUM(CASE WHEN pr.liked = TRUE THEN 1 ELSE -1 END), 0) FROM post_reactions pr WHERE pr.post_id = p.id) desc", nativeQuery = true)
	List<Post> getBestPosts(PageRequest pageable);

	/* Search by multiple tags
	@Query(value = "SELECT p.* FROM Posts p " +
		"INNER JOIN post2tag tg " +
		"ON p.id = tg.post_id " +
		"INNER JOIN tags t " +
		"ON tg.tag_id = t.id " +
		"WHERE t.name in (:tags) " +
		"AND p.deleted = false " +
		"AND p.draft = false " +
		"GROUP BY p.id, p.created_at " +
		"HAVING COUNT(DISTINCT t.id) = :quantity " +
		"ORDER BY p.created_at DESC", nativeQuery = true)
	List<Post> getPostsByTags(List<String> tags, int quantity, Pageable pageable);*/

	@Query("select p from Post p where p.deleted = false and p.author.id = :userId")
	List<Post> getPostsByAuthorId(UUID userId);

	int countPostByAuthorId(UUID id);

	@Query("select p from Post p where p.author.id = :userId order by p.createdAt desc ")
	List<Post> getFirstPostTitles(UUID userId, Pageable pageable);

	@Query("select p.title from Post p where p.id = :id")
	String getTitleById(UUID id);

	@Query("SELECT p FROM Post p WHERE p.deleted = false AND p.author.id = :userId and p.draft = true order by p.createdAt desc")
	List<Post> getDraftsByUser(UUID userId);

	@Query("select p from Post p where p.deleted = false and p.author.id = :userId order by p.createdAt desc")
	List<Post> getPostsByUser(UUID userId);

	@Query(value = "SELECT p.* " +
		"    FROM Posts p " +
		"        INNER JOIN Post2tag tg " +
		"            ON p.id = tg.post_id " +
		"        INNER JOIN Tags t " +
		"            ON tg.tag_id = t.id " +
		"    WHERE t.name in (:tags) and p.id != :id" +
		"    GROUP BY p.id " +
		"    ORDER BY count(tg.tag_id) DESC", nativeQuery = true)
	List<Post> getRelatedPostsByTags(UUID id, List<String> tags, Pageable pageable);

}
