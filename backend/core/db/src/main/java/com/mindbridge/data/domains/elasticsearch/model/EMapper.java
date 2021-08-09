package com.mindbridge.data.domains.elasticsearch.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.model.BaseEntity;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EMapper {

	public static ElasticEntity eEntityFromPostEntity(Post post, List<String> tags) {
		Map<String, Object> meta = new HashMap<>();
		meta.put("authorId", post.getAuthor().getId());

		return builderFromBaseEn(post).createdAt(post.getCreatedAt().toString()).author(post.getAuthor().getFullName()).title(post.getTitle()).tags(tags)
				.metadata(meta).build();
	}

	private static ElasticEntity.ElasticEntityBuilder builderFromBaseEn(BaseEntity entity) {
		Date updateAt = entity.getUpdatedAt() == null ? new Date() : entity.getUpdatedAt();
		return ElasticEntity.builder().updatedAt(updateAt.toString()).sourceId(entity.getId());
	}

}
