package com.mindbridge.data.domains.tag;

import com.mindbridge.data.domains.tag.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

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

}
