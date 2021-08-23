package com.mindbridge.data.domains.postVersion.model;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.model.Tag;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "post_versions")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class PostVersion extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	private String title;

	private String text;

	private Boolean markdown;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private User author;

	@Column(name = "cover_image")
	private String coverImage;

	private Boolean draft;

	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinTable(name = "post_version2tag", joinColumns = @JoinColumn(name = "post_version_id"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private Set<Tag> tags = new HashSet<>();

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " + "\"_class\":\"PostVersion\", " + "\"postId\":"
				+ (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " + "\"title\":"
				+ (title == null ? "null" : "\"" + title + "\"") + ", " + "\"text\":"
				+ (text == null ? "null" : "\"" + text + "\"") + ", " + "}";
	}

}
