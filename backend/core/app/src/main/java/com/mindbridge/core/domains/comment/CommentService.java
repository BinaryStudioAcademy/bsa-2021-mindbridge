package com.mindbridge.core.domains.comment;

import com.mindbridge.core.domains.comment.dto.CommentDto;
import com.mindbridge.data.domains.comment.CommentRepository;
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

	@Lazy
	@Autowired
	public CommentService(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}


	public List<CommentDto> findAllByPostId(UUID id) {
		return commentRepository.findAllByPostId(id).stream()
			.map(Optional::get)
			.map(CommentMapper.MAPPER::commentToCommentDto)
			.collect(Collectors.toList());
	}
}
