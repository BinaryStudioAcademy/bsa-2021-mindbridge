package com.mindbridge.data.domains.follower;

import com.mindbridge.data.domains.follower.model.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FollowerRepository extends JpaRepository<Follower, UUID>, JpaSpecificationExecutor<Follower> {

	int countFollowerByFollowedId(UUID id);

	@Query("select f from Follower f where f.follower.id = :follower and f.followed.id = :followed")
	Optional<Follower> findFollowerByFollowerAndFollowed(UUID follower, UUID followed);

	@Query("select f from Follower f where f.deleted = false and f.followed.id = :userId")
	List<Follower> getAllFollowers(UUID userId);

}
