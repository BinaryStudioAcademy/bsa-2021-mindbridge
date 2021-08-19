package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRDetailsDto;
import com.mindbridge.data.domains.postPR.PostPRRepository;
import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.tag.TagRepository;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@Slf4j
public class PostPRService {

	private final PostPRRepository postPRRepository;

	private final TagRepository tagRepository;

	@Lazy
	@Autowired
	public PostPRService(PostPRRepository postPRRepository, TagRepository tagRepository) {
		this.postPRRepository = postPRRepository;
		this.tagRepository = tagRepository;
	}

	public void create(CreatePostPRDto createPostPRDto) {
		var postPR = PostPRMapper.MAPPER.createPostPRDtoToPostPr(createPostPRDto);
		var tags = new HashSet<>(tagRepository.findAllById(createPostPRDto.getTags()));
		postPR.setTags(tags);

		postPRRepository.save(postPR);
	}

	public PostPRDetailsDto getPR(UUID id) {
		return postPRRepository.findById(id).map(PostPRMapper.MAPPER::postPRToPostPRDetailsDto).orElseThrow();
	}

	public UUID closePR(UUID id){
		postPRRepository.setPRClosed(id);
		PostPR postPR = postPRRepository.findById(id).orElseThrow();
		return postPR.getPost().getId();
	}
}
