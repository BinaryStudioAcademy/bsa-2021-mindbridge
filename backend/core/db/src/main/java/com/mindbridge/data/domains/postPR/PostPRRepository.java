package com.mindbridge.data.domains.postPR;

import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.postVersion.model.PostVersion;
import com.mindbridge.data.domains.tag.model.Tag;
import java.util.Arrays;
import java.util.Set;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PostPRRepository extends JpaRepository<PostPR, UUID>, JpaSpecificationExecutor<PostPR> {

	@Transactional
	@Modifying
	@Query("update PostPR pr set pr.state = 'closed' where pr.id = :id")
	void setPRClosed(@Param("id") UUID id);

	@Transactional
	@Modifying
	@Query("update PostPR pr set pr.state = 'accepted' where pr.id = :id")
	void setPRAccepted(@Param("id") UUID id);

	@Transactional
	@Modifying
	@Query("update PostPR pr " + "set pr.title = :title, " + "pr.text = :text " + "where pr.id = :id")
	void updatePR(@Param("id") UUID id, @Param("title") String title, @Param("text") String text);

	@Query("SELECT pr from PostPR pr where pr.deleted = false and pr.post.id = :postId order by pr.createdAt desc")
	List<PostPR> getPostPRByPostId(UUID postId, Pageable pageable);

	@Query("SELECT pr from PostPR pr where pr.deleted = false and pr.post.id = :postId and pr.state = :state order by pr.createdAt desc")
	List<PostPR> getOpenPostPRByPostId(UUID postId, PostPR.State state, Pageable pageable);


	int countPostPRByContributorId(UUID id);

	@Query("SELECT pr from PostPR pr where pr.deleted = false and pr.contributor.id = :id order by pr.createdAt desc")
	List<PostPR> getPostPRByUserId(UUID id, Pageable pageable);

	@Query("SELECT COUNT(pr) from PostPR pr where pr.state = 'accepted' and pr.contributor.id = :id")
	int countAcceptedPostPRByContributorId(UUID id);

	@Query("SELECT pr from PostPR pr where pr.deleted = false and pr.post.author.id = :id order by pr.createdAt desc")
	List<PostPR> getPostPRByPostAuthorId(UUID id, Pageable pageable);
}
