package com.mindbridge.core.domains.postReaction;

import com.mindbridge.core.domains.post.PostService;
import com.mindbridge.core.domains.postReaction.dto.ReceivedPostReactionDto;
import com.mindbridge.core.domains.postReaction.dto.ResponsePostReactionDto;
import com.mindbridge.data.domains.postReaction.PostReactionRepository;
import com.mindbridge.data.domains.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.beans.Transient;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class PostReactionService {

	@Autowired
	private final PostReactionRepository postReactionRepository;

	@Autowired
	private PostService postService;

	@Autowired
	private UserRepository userRepository;

	public PostReactionService(PostReactionRepository postReactionRepository) {
		this.postReactionRepository = postReactionRepository;
	}

	public long calcPostRatingById(UUID id) {
		return postReactionRepository.calcPostRating(id);
	}

	public Optional<ResponsePostReactionDto> setReaction(ReceivedPostReactionDto postReaction) {
		var currentUser = userRepository.findById(postReaction.getUserId()).orElseThrow();
		if (currentUser.isEmailVerified()) {
			var reaction = postReactionRepository.getPostReaction(postReaction.getUserId(), postReaction.getPostId());
			if (reaction.isPresent()) {
				var react = reaction.get();
				if (react.getLiked() == postReaction.getLiked()) {
					postReactionRepository.deleteById(react.getId());
					return Optional.empty();
				} else {
					react.setLiked(postReaction.getLiked());
					var result = postReactionRepository.save(react);
					return Optional.of(ResponsePostReactionDto.builder().id(result.getId()).liked(result.getLiked())
						.userId(result.getAuthor().getId()).postId(postReaction.getPostId()).isFirstReaction(false).build());
				}
			} else {
				var postReact = PostReactionMapper.MAPPER.dtoToPostReaction(postReaction);
				var result = postReactionRepository.save(postReact);
				return Optional.of(ResponsePostReactionDto.builder().id(result.getId()).liked(result.getLiked())
					.userId(result.getAuthor().getId()).postId(postReaction.getPostId()).isFirstReaction(true).build());
			}
		}
		throw new HttpClientErrorException(HttpStatus.FORBIDDEN);
	}

}
