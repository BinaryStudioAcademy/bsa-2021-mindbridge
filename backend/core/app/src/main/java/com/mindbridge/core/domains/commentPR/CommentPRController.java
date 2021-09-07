package com.mindbridge.core.domains.commentPR;

import com.mindbridge.core.domains.commentPR.dto.CreateCommentPrDto;
import com.mindbridge.data.domains.PRComment.model.PRComment;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/commentPR")
@Validated
public class CommentPRController {

	private final CommentPRService commentPRService;

	public CommentPRController(CommentPRService commentPRService) {
		this.commentPRService = commentPRService;
	}

	@PostMapping("/add")
	public PRComment addCommentToPR(@RequestBody CreateCommentPrDto prComment) {
		return commentPRService.addCommentToPr(prComment);
	}
}
