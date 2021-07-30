package com.mindbridge.data.domains.postReaction;

import com.mindbridge.data.domains.postReaction.model.PostReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface PostReactionRepository extends JpaRepository<PostReaction, UUID>, JpaSpecificationExecutor<PostReaction> {
}
