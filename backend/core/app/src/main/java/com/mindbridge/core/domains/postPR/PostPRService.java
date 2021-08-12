package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.data.domains.postPR.PostPRRepository;
import com.mindbridge.data.domains.tag.TagRepository;
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

}
