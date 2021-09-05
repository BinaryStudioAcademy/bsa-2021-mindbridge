package com.mindbridge.data.domains.tag;

import com.mindbridge.data.domains.tag.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID>, JpaSpecificationExecutor<Tag> {

	@Query("SELECT DISTINCT tag.name " + " FROM Post p " + " JOIN p.tags as tag" + " JOIN tag.posts"
			+ " WHERE p.id = :id ")
	List<String> getTagById(UUID id);

	@Transactional
	@Modifying
	@Query(value = "Delete from post_pr2tag " + "where post_pr_id = :id", nativeQuery = true)
	void deleteAllByPostPrId(UUID id);

	@Transactional
	@Modifying
	@Query(value = "INSERT INTO post_pr2tag( post_pr_id, tag_id ) " + "VALUES ( :postPrId, :tagId ) ",
			nativeQuery = true)
	void saveTagToPr(UUID postPrId, UUID tagId);

	@Query(value = "SELECT t.* " +
		"FROM tags t " +
		"INNER JOIN post2tag pt ON pt.tag_id = t.id " +
		"GROUP BY t.id " +
		"ORDER BY COUNT(*) desc " +
		"LIMIT 20", nativeQuery = true)
	List<Tag> findPopularTags();
}
