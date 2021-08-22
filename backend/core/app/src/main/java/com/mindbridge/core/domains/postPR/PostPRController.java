package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

	@GetMapping("/all/{id}")
	public List<PostPRListDto> getPostPRs(@PathVariable UUID id,
											   @RequestParam(defaultValue = "0") Integer from,
											   @RequestParam(defaultValue = "4") Integer count) {
		return postPRService.getPostPRByPostId(id, from, count);
	}
}
