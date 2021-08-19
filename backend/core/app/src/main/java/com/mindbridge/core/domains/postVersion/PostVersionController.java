package com.mindbridge.core.domains.postVersion;

import com.mindbridge.core.domains.postVersion.dto.PostVersionsListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("postVersion")
@Validated
public class PostVersionController {

	private final PostVersionService postVersionService;

	@Autowired
	public PostVersionController(PostVersionService postVersionService) {
		this.postVersionService = postVersionService;
	}

	@GetMapping("/all/{id}")
	public List<PostVersionsListDto> getAllVersions(@PathVariable UUID id,
													@RequestParam(defaultValue = "0") Integer from,
													@RequestParam(defaultValue = "5") Integer count) {
		return postVersionService.getAllVersionsByPostId(id, from, count);
	}
}
