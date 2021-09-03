package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.EditPostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRDetailsDto;
import com.mindbridge.core.security.auth.UserPrincipal;
import com.mindbridge.data.domains.user.model.User;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
	public ResponseEntity<?> closePR(@PathVariable UUID id, @AuthenticationPrincipal UserPrincipal user) {
		if (!postPRService.closePR(id, user)) {
			return ResponseEntity.status(403).build();
		}
		else
			return ResponseEntity.status(200).build();
	}

	@PutMapping("accept/{id}")
	public ResponseEntity<?> acceptPR(@PathVariable UUID id, @AuthenticationPrincipal UserPrincipal user) {
		if (!postPRService.acceptPR(id, user)) {
			return ResponseEntity.status(403).build();
		}
		else
			return ResponseEntity.status(200).build();

	}

	@PostMapping("/edit")
	public ResponseEntity<?> editPR(@RequestBody EditPostPRDto editPostPRDto,
			@AuthenticationPrincipal UserPrincipal user) {
		if (!postPRService.editPR(editPostPRDto, user)) {
			return ResponseEntity.status(403).build();
		}
		else
			return ResponseEntity.status(200).build();
	}

	@GetMapping("/all/{id}")
	public List<PostPRListDto> getPostPRs(@PathVariable UUID id, @RequestParam(defaultValue = "0") Integer from,
			@RequestParam(defaultValue = "4") Integer count) {
		return postPRService.getPostPRByPostId(id, from, count);
	}

	@GetMapping("/open/{id}")
	public List<PostPRListDto> getOpenPostPRs(@PathVariable UUID id, @RequestParam(defaultValue = "0") Integer from,
											  @RequestParam(defaultValue = "4") Integer count) {
		return postPRService.getOpenPostPRsByPostId(id, from, count);
	}

	@GetMapping("/byUser/{id}")
	public List<PostPRDetailsDto> getPostPRsByUser(@PathVariable UUID id,
			@RequestParam(defaultValue = "0") Integer from, @RequestParam(defaultValue = "4") Integer count) {
		return postPRService.getPostPRByUserId(id, from, count);
	}

}
