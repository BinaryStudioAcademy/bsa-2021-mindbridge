package com.mindbridge.data.domains.follower;

import com.mindbridge.data.domains.follower.model.Follower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface FollowerRepository extends JpaRepository<Follower, UUID>, JpaSpecificationExecutor<Follower> {
}
