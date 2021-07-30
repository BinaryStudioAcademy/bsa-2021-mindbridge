package com.mindbridge.data.domains.postPR;

import com.mindbridge.data.domains.postPR.model.PostPR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface PostPRRepository extends JpaRepository<PostPR, UUID>, JpaSpecificationExecutor<PostPR> {
}
