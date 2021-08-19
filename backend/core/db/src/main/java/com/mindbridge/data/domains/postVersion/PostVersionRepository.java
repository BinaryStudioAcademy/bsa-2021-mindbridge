package com.mindbridge.data.domains.postVersion;

import com.mindbridge.data.domains.postVersion.model.PostVersion;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface PostVersionRepository extends JpaRepository<PostVersion, UUID>, JpaSpecificationExecutor<PostVersion> {

	@Query("SELECT pv from PostVersion pv where pv.deleted = false and pv.post.id = :postId order by pv.createdAt")
	List<PostVersion> getPostVersionByPostId(UUID postId, Pageable pageable);

}
