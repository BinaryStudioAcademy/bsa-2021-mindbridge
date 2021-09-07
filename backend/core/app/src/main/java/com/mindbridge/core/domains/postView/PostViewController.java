package com.mindbridge.core.domains.postView;

import com.mindbridge.core.domains.postView.dto.PostViewDto;
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
@RequestMapping("postView")
@Validated
public class PostViewController {

	private final PostViewService postViewService;

	@Autowired
	public PostViewController(PostViewService postViewService) {
		this.postViewService = postViewService;
	}

	@PostMapping("/save")
	public void savePostViews(@RequestBody PostViewDto postViewDto){
		postViewService.savePostViews(postViewDto);
	}

}
