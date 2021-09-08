package com.mindbridge.core.domains.commentPR;

import com.mindbridge.core.domains.commentPR.dto.CreateCommentPrDto;
import com.mindbridge.core.domains.commentPR.dto.EditPrCommentDto;
import com.mindbridge.core.domains.postPR.dto.CommentPrDto;
import com.mindbridge.data.domains.PRComment.model.PRComment;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

	@PutMapping("/edit")
	public CommentPrDto editPrComment(@RequestBody  EditPrCommentDto editPrCommentDto) {
		return commentPRService.editPrComment(editPrCommentDto);
	}
}
