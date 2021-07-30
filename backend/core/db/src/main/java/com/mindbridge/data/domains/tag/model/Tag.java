package com.mindbridge.data.domains.tag.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tags")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Tag extends BaseAuditableEntity {

	private String name;

	@ManyToMany(mappedBy = "tags", cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	private Set<Post> posts = new HashSet<>();

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"Tag\", " +
			"\"name\":" + (name == null ? "null" : "\"" + name + "\"") + ", " +
			"}";
	}
}
