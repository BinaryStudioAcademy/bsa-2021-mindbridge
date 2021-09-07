package com.mindbridge.data.domains.postViews;

import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.postViews.model.PostView;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PostViewsRepository extends JpaRepository<PostView, UUID>,
	JpaSpecificationExecutor<PostView> {

	int countByPostId(UUID id);

	Optional<PostView> findByUserIdAndUserIpAndPost(String userId, String userIp, Post post);
}
