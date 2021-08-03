package com.mindbridge.data.domains.comment;

import com.mindbridge.data.domains.comment.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID>, JpaSpecificationExecutor<Comment> {

	List<Optional<Comment>> findAllByPostId(UUID id);
}
