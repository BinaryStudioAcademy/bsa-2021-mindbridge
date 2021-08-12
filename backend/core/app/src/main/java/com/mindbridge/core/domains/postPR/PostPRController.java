package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
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

}
