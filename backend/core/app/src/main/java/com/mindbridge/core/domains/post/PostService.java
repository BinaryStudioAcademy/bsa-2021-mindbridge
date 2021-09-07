package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.achievement.AchievementHelper;
import com.mindbridge.core.domains.achievement.AchievementService;
import com.mindbridge.core.domains.comment.CommentService;
import com.mindbridge.core.domains.elasticsearch.ElasticService;
import com.mindbridge.core.domains.helpers.DateFormatter;
import com.mindbridge.core.domains.notification.NotificationService;
import com.mindbridge.core.domains.post.dto.*;
import com.mindbridge.core.domains.postReaction.PostReactionService;
import com.mindbridge.core.domains.postReaction.dto.ReceivedPostReactionDto;
import com.mindbridge.core.domains.tag.dto.TagDto;
import com.mindbridge.core.domains.user.UserMapper;
import com.mindbridge.data.domains.favorite.model.Favorite;
import com.mindbridge.data.domains.post.dto.PostsReactionsQueryResult;
import com.mindbridge.data.domains.tag.dto.TagDataDto;
import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.data.domains.postReaction.PostReactionRepository;
import com.mindbridge.data.domains.favorite.FavoriteRepository;
import com.mindbridge.data.domains.post.model.Post;
import com.mindbridge.data.domains.postVersion.PostVersionRepository;
import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.domains.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostService {

	private final PostRepository postRepository;

	private final CommentService commentService;

	private final PostReactionService postReactionService;

	private final PostVersionRepository postVersionRepository;

	private final UserRepository userRepository;

	private final TagRepository tagRepository;

	private final ElasticService elasticService;

	private final AchievementHelper achievementHelper;

	private final NotificationService notificationService;

  	private final FavoriteRepository favouriteRepository;

	private final PostReactionRepository postReactionRepository;

	private final UserService userService;

	@Lazy
	@Autowired
	public PostService(PostRepository postRepository, CommentService commentService, NotificationService notificationService,
			PostReactionService postReactionService, UserRepository userRepository, TagRepository tagRepository,
			PostVersionRepository postVersionRepository, ElasticService elasticService, FavoriteRepository favouriteRepository,
			PostReactionRepository postReactionRepository, UserService userService, AchievementHelper achievementHelper) {
    this.postRepository = postRepository;

		this.commentService = commentService;
		this.postReactionService = postReactionService;
		this.userRepository = userRepository;
		this.tagRepository = tagRepository;
		this.postVersionRepository = postVersionRepository;
		this.elasticService = elasticService;
		this.achievementHelper = achievementHelper;
		this.notificationService = notificationService;
		this.postReactionRepository = postReactionRepository;
		this.userService = userService;
		this.favouriteRepository = favouriteRepository;
	}

	public PostDetailsDto getPostById(Principal principal, UUID id) {
		var post = postRepository.findById(id);
		var postDetailsDto = post.map(PostMapper.MAPPER::postToPostDetailsDto).orElseThrow();

		postDetailsDto.setAuthor(userService.setUserStatInformation(UserMapper.MAPPER.userToUserDto(post.orElseThrow().getAuthor()).getId()));
		List<String> tags = postDetailsDto.getTags().stream().map(TagDto::getName).collect(Collectors.toList());
		List<RelatedPostDto> relatedPostsDto = postRepository.getRelatedPostsByTags(id, tags, PageRequest.of(0, 3))
			.stream()
			.map(PostMapper.MAPPER::postToRelatedPostDto)
			.collect(Collectors.toList());

		relatedPostsDto.forEach(p -> p.setRating(postReactionService.calcPostRatingById(p.getId())));
		relatedPostsDto.sort(Comparator.comparingLong(RelatedPostDto::getRating).reversed());

		var comments = commentService.findAllByPostId(id);
		postDetailsDto.setComments(comments);

		postDetailsDto.setRating(postReactionService.calcPostRatingById(id));
		postDetailsDto.setRelatedPosts(relatedPostsDto);

		if (principal == null) {
			return postDetailsDto;
		}
		var currentUser = userService.loadUserDtoByEmail(principal.getName());
		var reaction = postReactionRepository.getPostReaction(currentUser.getId(), postDetailsDto.getId());
		postDetailsDto.setReacted(reaction.isPresent());
		reaction.ifPresent(postReaction -> postDetailsDto.setIsLiked(postReaction.getLiked()));
		var favourite = favouriteRepository.getFavoriteByPostIdAndUserId(id, currentUser.getId());
		postDetailsDto.setIsFavourite(favourite.isPresent());

		return postDetailsDto;
	}

	public List<PostsListDetailsDto> getAllPosts(Principal principal, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		return postRepository.getAllPosts(pageable).stream().map(post -> mapPost(post, principal)).collect(Collectors.toList());
	}

	public PostsListDetailsDto mapPost(Post post, Principal principal) {
		var postListDto = PostMapper.MAPPER.postToPostsListDto(post);
		postListDto.setAuthor(userService.setUserStatInformation(post.getAuthor().getId()));
		postListDto.setCommentsCount(post.getComments().size());
		postListDto.setTags(post.getTags().stream().map(TagDataDto::fromEntity).collect(Collectors.toList()));
		PostsReactionsQueryResult postsReactionsQueryResult = postRepository.getAllReactionsOnPost(post.getId());
		postListDto.setLikesCount(postsReactionsQueryResult.likeCount);
		postListDto.setDisLikesCount(postsReactionsQueryResult.disLikeCount);
		postListDto.setPostRating(postsReactionsQueryResult.likeCount - postsReactionsQueryResult.disLikeCount);
		postListDto.setCreatedAt(DateFormatter.getDate(post.getCreatedAt(), "dd MMMM"));
		if (principal == null) {
			return postListDto;
		}
		var currentUser = userService.loadUserDtoByEmail(principal.getName());
		var favouritePosts = favouriteRepository.getAllPostByUserId(currentUser.getId());
		setIfFavourite(favouritePosts, postListDto);
		var reaction = postReactionRepository.getPostReaction(currentUser.getId(), post.getId());
		postListDto.setReacted(reaction.isPresent());
		reaction.ifPresent(postReaction -> postListDto.setIsLiked(postReaction.getLiked()));
		return postListDto;
	}

	public void setIfFavourite(List<Favorite> favouritePosts, PostsListDetailsDto post) {
		var found = favouritePosts.stream().filter(favouritePost -> favouritePost.getPost().getId().toString().equals(post.getId().toString())).findFirst();
		post.setIsFavourite(found.isPresent());
	}

	public UUID editPost(EditPostDto editPostDto) {
		var currentPost = postRepository.getOne(editPostDto.getPostId());
		if (!editPostDto.getDraft()) {
			var postVersion = PostMapper.MAPPER.postToPostVersion(currentPost);
			postVersion.setAuthor(userRepository.findById(editPostDto.getEditorId()).orElseThrow());
			postVersionRepository.save(postVersion);
		}
		currentPost.setTitle(editPostDto.getTitle());
		currentPost.setText(editPostDto.getText());
		currentPost.setMarkdown(editPostDto.getMarkdown());
		currentPost.setCoverImage(editPostDto.getCoverImage());
		currentPost.setDraft(editPostDto.getDraft());
		currentPost.setTags(new HashSet<>(tagRepository.findAllById(editPostDto.getTags())));

		return postRepository.save(currentPost).getId();
	}

	public UUID savePost(CreatePostDto createPostDto) {
		var post = PostMapper.MAPPER.createPostDtoToPost(createPostDto);
		var tags = new HashSet<>(tagRepository.findAllById(createPostDto.getTags()));
		post.setTags(tags);
		var savedPost = postRepository.save(post);
		notificationService.sendFollowersNewPost(createPostDto.getAuthor(), savedPost.getId());
		postReactionService
				.setReaction(new ReceivedPostReactionDto(savedPost.getId(), createPostDto.getAuthor(), true));
		if (!savedPost.getDraft()) {
			elasticService.put(savedPost);
		}
		achievementHelper.checkPostCount(post.getAuthor());
		return savedPost.getId();
	}

	public String getTitleOfPost(UUID id) {
		return postRepository.getTitleById(id);
	}

	public List<DraftsListDto> getAllDrafts(UUID userId) {
		return postRepository.getDraftsByUser(userId).stream().map(PostMapper.MAPPER::postToDraftDto)
				.collect(Collectors.toList());
	}

	public List<DraftsListDto> getAllMyPosts(UUID userId) {
		return postRepository.getPostsByUser(userId).stream().map(PostMapper.MAPPER::postToDraftDto)
			.collect(Collectors.toList());
	}

	public List<PostsListDetailsDto> listIDsToListPosts(List<UUID> postIds, Principal principal) {
		return postRepository.findAllById(postIds).stream().map(post -> mapPost(post, principal)).collect(Collectors.toList());
	}

}
