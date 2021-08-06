package com.mindbridge.core.domains.postReaction;

import com.mindbridge.data.domains.postReaction.PostReactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class PostReactionService {

	private final PostReactionRepository postReactionRepository;

	public PostReactionService(PostReactionRepository postReactionRepository) {
		this.postReactionRepository = postReactionRepository;
	}

	public long calcPostRatingById(UUID id) {
		return postReactionRepository.calcPostRating(id);
	}

}
