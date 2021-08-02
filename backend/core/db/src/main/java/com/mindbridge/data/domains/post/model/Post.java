package com.mindbridge.data.domains.post.model;

import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.postReaction.model.PostReaction;
import com.mindbridge.data.domains.postVersion.model.PostVersion;
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
@Table(name = "posts")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class Post extends BaseAuditableEntity {

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private User author;

	private String title;

	private String text;

	private Boolean draft;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Comment> comments = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<PostReaction> reactions = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<PostVersion> versions = new ArrayList<>();

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<PostPR> pullRequests = new ArrayList<>();

	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinTable(
		name = "post2tag",
		joinColumns = @JoinColumn(name = "post_id"),
		inverseJoinColumns = @JoinColumn(name = "tag_id")
	)
	private Set<Tag> tags = new HashSet<>();

	@Override
	public String toString() {
		return "{\"_super\": " + super.toString() + ", " +
			"\"_class\":\"Post\", " +
			"\"authorId\":" + (author.getId() == null ? "null" : "\"" + author.getId() + "\"") + ", " +
			"\"title\":" + (title == null ? "null" : "\"" + title + "\"") + ", " +
			"\"text\":" + (text == null ? "null" : "\"" + text + "\"") + ", " +
			"\"draft\":" + (draft == null ? "null" : "\"" + draft + "\"") + ", " +
			"}";
	}
}
