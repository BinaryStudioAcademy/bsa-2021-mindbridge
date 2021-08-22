package com.mindbridge.data.domains.postPR;

import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.postVersion.model.PostVersion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface PostPRRepository extends JpaRepository<PostPR, UUID>, JpaSpecificationExecutor<PostPR> {

	@Query("SELECT pr from PostPR pr where pr.deleted = false and pr.post.id = :postId order by pr.createdAt desc")
	List<PostPR> getPostPRByPostId(UUID postId, Pageable pageable);

	int countPostPRByContributorId(UUID id);
  
}
