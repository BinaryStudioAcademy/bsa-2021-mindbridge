package com.mindbridge.core.domains.postView;

import com.mindbridge.core.domains.postView.dto.PostViewDto;
import com.mindbridge.data.domains.postViews.PostViewsRepository;
import com.mindbridge.data.domains.postViews.model.PostView;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PostViewService {

	private final PostViewsRepository postViewsRepository;

	@Autowired
	public PostViewService(PostViewsRepository postViewsRepository) {
		this.postViewsRepository = postViewsRepository;
	}

	public void savePostViews(PostViewDto postViewDto) {
		PostView postView = PostViewMapper.MAPPER.postViewDtoToPostView(postViewDto);
		if(postViewsRepository.findByUserIdAndUserIpAndPost(
			postView.getUserId(), postView.getUserIp(), postView.getPost()).isEmpty()){
			postViewsRepository.save(postView);
		}

	}
}
