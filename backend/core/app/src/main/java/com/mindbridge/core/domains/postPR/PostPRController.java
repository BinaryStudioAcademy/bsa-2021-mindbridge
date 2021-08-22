package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRDetailsDto;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mindbridge.core.domains.postPR.dto.PostPRListDto;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

	@PutMapping("/close/{id}")
	public void closePR(@PathVariable UUID id) {
		postPRService.closePR(id);
	}

	@PutMapping("accept/{id}")
	public void acceptPR(@PathVariable UUID id) {
		postPRService.acceptPR(id);
		postPRService.closePR(id);
	}

	@GetMapping("/all/{id}")
	public List<PostPRListDto> getPostPRs(@PathVariable UUID id, @RequestParam(defaultValue = "0") Integer from,
			@RequestParam(defaultValue = "4") Integer count) {
		return postPRService.getPostPRByPostId(id, from, count);
	}

}
