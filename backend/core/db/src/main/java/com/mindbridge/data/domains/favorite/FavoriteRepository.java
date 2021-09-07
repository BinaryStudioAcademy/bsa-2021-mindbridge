package com.mindbridge.data.domains.favorite;

import com.mindbridge.data.domains.favorite.model.Favorite;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID>, JpaSpecificationExecutor<Favorite> {

	@Query("SELECT f from Favorite f where f.deleted = false and f.user.id = :id order by f.createdAt desc")
	List<Favorite> getAllByUserId(UUID id, Pageable pageable);

	@Query("SELECT f from Favorite f where f.deleted = false and f.user.id = :userId")
	List<Favorite> getAllPostByUserId(UUID userId);

	Optional<Favorite> getFavoriteByPostId(UUID id);
}
