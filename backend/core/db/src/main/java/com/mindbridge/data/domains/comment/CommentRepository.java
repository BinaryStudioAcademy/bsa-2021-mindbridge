package com.mindbridge.data.domains.comment;

import com.mindbridge.data.domains.comment.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID>, JpaSpecificationExecutor<Comment> {

	@Query("select c from Comment c where c.post.id = :id")
	List<Comment> findAllByPostId(@Param("id") UUID id);

}
