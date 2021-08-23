package com.mindbridge.core.domains.postReaction;

import com.mindbridge.core.domains.post.PostService;
import com.mindbridge.core.domains.postReaction.dto.ReceivedPostReactionDto;
import com.mindbridge.core.domains.postReaction.dto.ResponsePostReactionDto;
import com.mindbridge.data.domains.postReaction.PostReactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	public PostReactionService(PostReactionRepository postReactionRepository) {
		this.postReactionRepository = postReactionRepository;
	}

	public long calcPostRatingById(UUID id) {
		return postReactionRepository.calcPostRating(id);
	}

	public Optional<ResponsePostReactionDto> setReaction(ReceivedPostReactionDto postReaction) {
		var reaction = postReactionRepository.getPostReaction(postReaction.getUserId(), postReaction.getPostId());
		System.out.println(postReaction);
		if (reaction.isPresent()) {
			var react = reaction.get();
			if (react.getLiked() == postReaction.getLiked()) {
				postReactionRepository.deleteById(react.getId());
				return Optional.empty();
			}
			else {
				react.setLiked(postReaction.getLiked());
				var result = postReactionRepository.save(react);
				var post = postService.getPostById(result.getPost().getId());
				return Optional.of(ResponsePostReactionDto.builder().id(result.getId()).liked(result.getLiked())
						.userId(result.getAuthor().getId()).postId(post.getId()).authorId(post.getAuthor().getId())
						.isFirstReaction(false).build());
			}
		}
		else {
			var postReact = PostReactionMapper.MAPPER.dtoToPostReaction(postReaction);
			var result = postReactionRepository.save(postReact);
			var post = postService.getPostById(result.getPost().getId());
			return Optional.of(ResponsePostReactionDto.builder().id(result.getId()).liked(result.getLiked())
					.userId(result.getAuthor().getId()).postId(post.getId()).authorId(post.getAuthor().getId())
					.isFirstReaction(true).build());
		}
	}

}
