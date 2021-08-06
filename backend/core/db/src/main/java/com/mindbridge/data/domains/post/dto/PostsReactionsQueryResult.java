package com.mindbridge.data.domains.post.dto;

import com.mindbridge.data.domains.tag.model.Tag;
import com.mindbridge.data.domains.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostsReactionsQueryResult {

	public long likeCount;

	public long disLikeCount;

}
