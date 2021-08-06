package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.data.domains.comment.CommentRepository;
import com.mindbridge.data.domains.commentReaction.CommentReactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommentService {

	private final CommentRepository commentRepository;

	private final CommentReactionRepository commentReactionRepository;

	@Lazy
	@Autowired
	public CommentService(CommentRepository commentRepository, CommentReactionRepository commentReactionRepository) {
		this.commentRepository = commentRepository;
		this.commentReactionRepository = commentReactionRepository;
	}

	public List<CommentDto> findAllByPostId(UUID id) {
		var comments = commentRepository.findAllByPostId(id).stream().map(CommentMapper.MAPPER::commentToCommentDto)
				.collect(Collectors.toList());

		comments = calcRatingForAll(comments);
		return comments;
	}

	public List<CommentDto> calcRatingForAll(List<CommentDto> comments) {
		comments.forEach(comment -> {
			comment.setRating(commentReactionRepository.calcCommentRating(comment.getId()));
			if (!comment.getComments().isEmpty()) {
				comment.setComments(calcRatingForAll(comment.getComments()));
			}
		});
		return comments;
	}

}
