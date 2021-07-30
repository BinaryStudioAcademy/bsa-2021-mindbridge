package com.mindbridge.data.domains.PRComment;

import com.mindbridge.data.domains.PRComment.model.PRComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface PRCommentRepository extends JpaRepository<PRComment, UUID>, JpaSpecificationExecutor<PRComment> {
}
