package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.post.PostService;
import com.mindbridge.core.domains.post.dto.EditPostDto;
import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRDetailsDto;
import com.mindbridge.data.domains.postPR.PostPRRepository;
import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.tag.TagRepository;
import java.util.HashSet;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PostPRService {

	private final PostPRRepository postPRRepository;

	private final TagRepository tagRepository;

	private final PostService postService;

	@Lazy
	@Autowired
	public PostPRService(PostPRRepository postPRRepository, TagRepository tagRepository,
		PostService postService) {
		this.postPRRepository = postPRRepository;
		this.tagRepository = tagRepository;
		this.postService = postService;
	}

	public void create(CreatePostPRDto createPostPRDto) {
		var postPR = PostPRMapper.MAPPER.createPostPRDtoToPostPr(createPostPRDto);
		var tags = new HashSet<>(tagRepository.findAllById(createPostPRDto.getTags()));
		postPR.setTags(tags);

		postPRRepository.save(postPR);
	}

	public PostPRDetailsDto getPR(UUID id) {
		return postPRRepository.findById(id).map(PostPRMapper.MAPPER::postPRToPostPRDetailsDto)
			.orElseThrow();
	}

	public void closePR(UUID id) {
		postPRRepository.setPRClosed(id);
	}

	public void acceptPR(UUID id) {
		PostPR postPR = postPRRepository.getOne(id);
		EditPostDto editPostDto = EditPostDto.fromPostPR(postPR);
		postService.editPost(editPostDto);
	}
}
