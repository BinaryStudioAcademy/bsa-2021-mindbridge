package com.mindbridge.core.domains.postVersion;

import com.mindbridge.core.domains.post.dto.PostVersionDetailsDto;
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
		return postVersionRepository.getPostVersionsByPostId(id, pageable).stream()
			.map(PostVersionMapper.MAPPER::postVersionToPostVersionList)
			.collect(Collectors.toList());
	}

	public PostVersionDetailsDto getPostVersion(UUID id) {
		var postVersion = postVersionRepository.findById(id);
		var versions = postVersionRepository.getPostVersionByPostId(postVersion.get().getPost().getId());
		var indexOfVersion = versions.indexOf(postVersion.get());
		if (indexOfVersion == versions.size() - 1) {
			return postVersion.map(com.mindbridge.core.domains.post.dto.PostVersionMapper.MAPPER::PostVersionToPreLastPostVersionDetailsDto).orElseThrow();
		}
		var returnPostVersion = postVersion.map(com.mindbridge.core.domains.post.dto.PostVersionMapper.MAPPER::PostVersionToPreLastPostVersionDetailsDto).orElseThrow();
		returnPostVersion.setPost(com.mindbridge.core.domains.post.dto.PostVersionMapper.MAPPER.PostVersionToPostVersionDetailsDto(versions.get(indexOfVersion + 1)));
		return returnPostVersion;
	}
}
