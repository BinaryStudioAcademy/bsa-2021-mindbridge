package com.mindbridge.data.domains.post.dto;

import com.mindbridge.data.domains.comment.model.Comment;
import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.postReaction.model.PostReaction;
import com.mindbridge.data.domains.postVersion.model.PostVersion;
import com.mindbridge.data.domains.tag.model.Tag;
import com.mindbridge.data.domains.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDetailsQueryResult {
	private UUID id;
	private Date createdAt;
	private Date updatedAt;
	private String title;
	private String text;
	private User author;
	private Set<Tag> tags;
	private long reactions;
}
