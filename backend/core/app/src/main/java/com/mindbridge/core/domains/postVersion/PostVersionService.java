package com.mindbridge.core.domains.postVersion;

import com.mindbridge.core.domains.post.PostMapper;
import com.mindbridge.core.domains.postVersion.dto.PostVersionDetailsDto;
import com.mindbridge.core.domains.postVersion.dto.PostVersionsListDto;
import com.mindbridge.core.domains.user.UserMapper;
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
			.map(PostVersionMapper.MAPPER::postVersionToPostVersionList).collect(Collectors.toList());
	}

	public PostVersionDetailsDto getPostVersion(UUID id) {
		var postVersion = postVersionRepository.findById(id);
		var allPostVersions = postVersionRepository.getPostVersionByPostId(postVersion.get().getPost().getId());
		var indexOfVersion = allPostVersions.indexOf(postVersion.get());
		if (indexOfVersion == allPostVersions.size() - 1) {
			var postVersionDetailsDto = postVersion
					.map(PostVersionMapper.MAPPER::PostVersionToPostVersionDetailsDto).orElseThrow();
			postVersionDetailsDto.setAuthor(UserMapper.MAPPER.userToUserDto(postVersion.get().getPost().getAuthor()));
			return postVersionDetailsDto;
		}
		var postVersionDetailsDto = postVersion.map(PostVersionMapper.MAPPER::PostVersionToPostVersionDetailsDto)
				.orElseThrow();
		postVersionDetailsDto.setPreVersion(
				PostVersionMapper.MAPPER.PostVersionToPostVersionDetailsDto(allPostVersions.get(indexOfVersion + 1)));
		postVersionDetailsDto.setAuthor(UserMapper.MAPPER.userToUserDto(postVersion.get().getPost().getAuthor()));
		return postVersionDetailsDto;
	}
}
