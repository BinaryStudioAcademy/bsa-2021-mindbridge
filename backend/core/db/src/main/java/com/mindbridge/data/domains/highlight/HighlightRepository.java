package com.mindbridge.data.domains.highlight;

import com.mindbridge.data.domains.highlight.model.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface HighlightRepository extends JpaRepository<Highlight, UUID>, JpaSpecificationExecutor<Highlight> {
}
