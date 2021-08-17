package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRDetailsDto;
import com.mindbridge.data.domains.postPR.model.PostPR;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("postPR")
@Validated
public class PostPRController {

	private final PostPRService postPRService;

	@Autowired
	public PostPRController(PostPRService postPRService) {
		this.postPRService = postPRService;
	}

	@PostMapping("/create")
	public void create(@RequestBody CreatePostPRDto createPostPRDto) {
		postPRService.create(createPostPRDto);
	}

	@GetMapping("/{id}")
	public PostPRDetailsDto getPR(@PathVariable UUID id) {
		return postPRService.getPR(id);
	}
}
