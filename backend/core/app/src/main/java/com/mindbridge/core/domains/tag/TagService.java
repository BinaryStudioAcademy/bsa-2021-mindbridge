package com.mindbridge.core.domains.tag;

import com.mindbridge.core.domains.tag.dto.TagDto;
import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.domains.tag.dto.TagDataDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

	private final TagRepository tagRepository;

	public TagService(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	public List<TagDataDto> getTags() {
		return tagRepository.findAll().stream().map(TagDataDto::fromEntity).collect(Collectors.toList());
	}

	public List<TagDataDto> getPopularTags() {
		return tagRepository.findPopularTags().stream().map(TagDataDto::fromEntity).collect(Collectors.toList());
	}

}
