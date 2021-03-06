package com.mindbridge.data.domains.postPR.model;

import com.mindbridge.data.domains.PRComment.model.PRComment;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.tag.model.Tag;
import com.mindbridge.data.domains.user.model.User;
import com.mindbridge.data.model.BaseAuditableEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "post_pr")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class PostPR extends BaseAuditableEntity {

	public static enum State {

		open, closed, accepted

	}

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "contributor_id")
	private User contributor;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	private String title;

	private String text;

	private Boolean markdown;

	@Column(name = "cover_image")
	private String coverImage;

	@Enumerated(EnumType.STRING)
	private State state;

	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinTable(name = "post_pr2tag", joinColumns = @JoinColumn(name = "post_pr_id"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private Set<Tag> tags = new HashSet<>();

	@OneToMany(mappedBy = "postPR", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<PRComment> comments = new ArrayList<>();

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " + "\"_class\":\"PostPR\", " + "\"postId\":"
				+ (contributor.getId() == null ? "null" : "\"" + contributor.getId() + "\"") + ", " + "\"postId\":"
				+ (post.getId() == null ? "null" : "\"" + post.getId() + "\"") + ", " + "\"text\":"
				+ (text == null ? "null" : "\"" + text + "\"") + ", " + "\"closed\":" + (state + "\"") + ", " + "}";
	}

}
