package com.mindbridge.data.domains.highlight;

import com.mindbridge.data.domains.highlight.model.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;

import java.util.*;

public interface HighlightRepository extends JpaRepository<Highlight, UUID>, JpaSpecificationExecutor<Highlight> {

	@Query("SELECT h from Highlight h where h.deleted = false and h.user.id = :id order by h.createdAt desc")
	List<Highlight>getAllByUserId(UUID id, Pageable pageable);

	@Query("SELECT h from Highlight h where h.deleted = false and h.user.id = :id order by h.createdAt desc ")
	List<Highlight>getAllByUserId(UUID id);
}
