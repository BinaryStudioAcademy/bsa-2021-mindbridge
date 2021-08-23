package com.mindbridge.core.domains.postVersion;

import com.mindbridge.core.domains.postVersion.dto.PostVersionsListDto;
import com.mindbridge.data.domains.postVersion.PostVersionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostVersionService {

	private final PostVersionRepository postVersionRepository;

	public PostVersionService(PostVersionRepository postVersionRepository) {
		this.postVersionRepository = postVersionRepository;
	}

	public List<PostVersionsListDto> getAllVersionsByPostId(UUID id, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		return postVersionRepository.getPostVersionByPostId(id, pageable).stream()
				.map(PostVersionMapper.MAPPER::postVersionToPostVersionList).collect(Collectors.toList());
	}

}
