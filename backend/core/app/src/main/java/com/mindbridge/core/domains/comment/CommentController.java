package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.comment.dto.CreateCommentDto;
import com.mindbridge.core.domains.comment.dto.ReplyCommentDto;
import com.mindbridge.data.domains.comment.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/comment")
@Validated
public class CommentController {

	private final CommentService commentService;

	@Autowired
	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}


	@PutMapping("/add")
	public Comment addComment(@RequestBody CreateCommentDto comment) {
		return commentService.addComment(comment);
	}

	@PutMapping("/reply")
	public Comment addReplyToComment(@RequestBody ReplyCommentDto reply) {
		return commentService.addReplyToComment(reply);
	}
}
