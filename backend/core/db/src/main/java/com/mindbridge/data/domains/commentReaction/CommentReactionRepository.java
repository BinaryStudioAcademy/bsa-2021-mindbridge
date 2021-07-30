package com.mindbridge.data.domains.commentReaction;

import com.mindbridge.data.domains.commentReaction.model.CommentReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface CommentReactionRepository extends JpaRepository<CommentReaction, UUID>, JpaSpecificationExecutor<CommentReaction> {
}
