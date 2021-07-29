package com.mindbridge.data.domains.postVersion;

import com.mindbridge.data.domains.postVersion.model.PostVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface PostVersionRepository extends JpaRepository<PostVersion, UUID>, JpaSpecificationExecutor<PostVersion> {
}
