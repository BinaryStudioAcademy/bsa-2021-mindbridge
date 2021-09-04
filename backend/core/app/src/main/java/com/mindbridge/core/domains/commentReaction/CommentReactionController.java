package com.mindbridge.core.domains.commentReaction;

import com.mindbridge.core.domains.commentReaction.dto.ReceivedCommentReactionDto;
import com.mindbridge.core.domains.commentReaction.dto.ResponseCommentReactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/commentreaction")
public class CommentReactionController {

	@Autowired
	private CommentReactionService commentReactionService;

	@PutMapping
	public Optional<ResponseCommentReactionDto> setReaction(
			@RequestBody ReceivedCommentReactionDto commentReactionDto) {
		return commentReactionService.setReaction(commentReactionDto);
	}

}
