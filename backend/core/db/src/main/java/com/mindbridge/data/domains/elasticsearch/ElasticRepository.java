package com.mindbridge.data.domains.elasticsearch;

import com.mindbridge.data.domains.elasticsearch.model.ElasticEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.Optional;
import java.util.UUID;

public interface ElasticRepository extends ElasticsearchRepository<ElasticEntity, UUID> {

	Optional<ElasticEntity> findById(UUID id);

	Optional<ElasticEntity> findBySourceId(UUID sourceId);

	long deleteAllBy();

}
