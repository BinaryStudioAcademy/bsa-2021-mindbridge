package com.mindbridge.core.domains.tag;

import com.mindbridge.core.domains.tag.dto.TagDto;
import com.mindbridge.data.domains.tag.TagRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class TagService {

	private final TagRepository tagRepository;

	public TagService(TagRepository tagRepository){
		this.tagRepository = tagRepository;
	}

	public List<TagDto> getTags() {
		return tagRepository.findAll().stream().map(TagDto::fromEntity).collect(
			Collectors.toList());
	}
}
