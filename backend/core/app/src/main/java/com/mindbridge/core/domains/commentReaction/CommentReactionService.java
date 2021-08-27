package com.mindbridge.core.domains.commentReaction;

import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.commentReaction.dto.ReceivedCommentReactionDto;
import com.mindbridge.core.domains.commentReaction.dto.ResponseCommentReactionDto;
import com.mindbridge.data.domains.commentReaction.CommentReactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class CommentReactionService {

	@Autowired
	private final CommentReactionRepository commentReactionRepository;

	@Autowired
	private CommentService commentService;

	public CommentReactionService(CommentReactionRepository commentReactionRepository) {
		this.commentReactionRepository = commentReactionRepository;
	}

	public Optional<ResponseCommentReactionDto> setReaction(ReceivedCommentReactionDto commentReactionDto) {
		var reaction = commentReactionRepository.getCommentReaction(commentReactionDto.getUserId(), commentReactionDto.getCommentId());
		System.out.println(reaction);
		if (reaction.isPresent()) {
			var react = reaction.get();
			if(react.getLiked() == commentReactionDto.getLiked()) {
				commentReactionRepository.deleteById(react.getId());
				return Optional.empty();
			}
			else {
				react.setLiked(commentReactionDto.getLiked());
				var result = commentReactionRepository.save(react);
				var comment = commentService.getCommentById(result.getComment().getId());
			return Optional.of(ResponseCommentReactionDto.builder().id(result.getId()).liked(result.getLiked())
				.userId(result.getAuthor().getId()).commentId(comment.getId()).authorId(comment.getAuthor().getId())
				.isFirstReaction(false).build());
			}
		} else {
			var commentReaction = CommentReactionMapper.MAPPER.dtoToPosReaction(commentReactionDto);
			var result = commentReactionRepository.save(commentReaction);
			var comment = commentService.getCommentById(result.getComment().getId());
			return Optional.of(ResponseCommentReactionDto.builder().id(result.getId()).liked(result.getLiked())
				.userId(result.getAuthor().getId()).commentId(comment.getId()).authorId(comment.getAuthor().getId())
				.isFirstReaction(true).build());
		}

	}
}
