package com.mindbridge.core.domains.postReaction;

import com.mindbridge.core.domains.postReaction.dto.PostReactionDto;
import com.mindbridge.core.domains.postReaction.dto.ReceivedPostReactionDto;
import com.mindbridge.core.domains.postReaction.dto.ResponsePostReactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/postreaction")
public class PostReactionController {

	@Autowired
	private PostReactionService postReactionService;

	@PutMapping
	public Optional<ResponsePostReactionDto> setReaction(@RequestBody ReceivedPostReactionDto postReaction) {
		return postReactionService.setReaction(postReaction);
	}

}
