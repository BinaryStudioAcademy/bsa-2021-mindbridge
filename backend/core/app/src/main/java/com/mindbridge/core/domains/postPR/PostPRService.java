package com.mindbridge.core.domains.postPR;

import com.mindbridge.core.domains.notification.NotificationService;
import com.mindbridge.core.domains.notification.dto.CreateNotificationDto;
import com.mindbridge.core.domains.post.PostService;
import com.mindbridge.core.domains.post.dto.EditPostDto;
import com.mindbridge.core.domains.postPR.dto.CreatePostPRDto;
import com.mindbridge.core.domains.postPR.dto.EditPostPRDto;
import com.mindbridge.core.domains.postPR.dto.PostPRDetailsDto;
import com.mindbridge.core.domains.postPR.dto.PostPRListDto;
import com.mindbridge.core.domains.user.UserService;
import com.mindbridge.data.domains.notification.model.Notification;
import com.mindbridge.core.security.auth.UserPrincipal;
import com.mindbridge.data.domains.postPR.PostPRRepository;
import com.mindbridge.data.domains.postPR.model.PostPR;
import com.mindbridge.data.domains.postPR.model.PostPR.State;
import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.domains.user.model.User;
import java.util.HashSet;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PostPRService {

	private final PostPRRepository postPRRepository;

	private final TagRepository tagRepository;

	private final PostService postService;

	private final NotificationService notificationService;

	private final UserService userService;

	@Lazy
	@Autowired
	public PostPRService(PostPRRepository postPRRepository, TagRepository tagRepository, PostService postService,
						 NotificationService notificationService, UserService userService) {
		this.postPRRepository = postPRRepository;
		this.tagRepository = tagRepository;
		this.postService = postService;
		this.notificationService = notificationService;
    	this.userService = userService;
	}

	public void create(CreatePostPRDto createPostPRDto) {
		var postPR = PostPRMapper.MAPPER.createPostPRDtoToPostPr(createPostPRDto);
		var tags = new HashSet<>(tagRepository.findAllById(createPostPRDto.getTags()));
		postPR.setTags(tags);
		postPR.setState(State.open);
		postPRRepository.save(postPR);

		notificationService.createNotification(
			postService.getPostById(createPostPRDto.getPostId()).getAuthor().getId(),
			userService.getUserById(createPostPRDto.getContributorId()).getNickname(),
			postPR.getId(),
			Notification.Type.newPR);
	}

	public PostPRDetailsDto getPR(UUID id) {
		return postPRRepository.findById(id).map(PostPRMapper.MAPPER::postPRToPostPRDetailsDto).orElseThrow();
	}

	public boolean closePR(UUID prId, UserPrincipal userPrincipal) {
		var user = userPrincipal.getUser();
		var userDto = userService.loadUserDtoByEmail(user.getEmail());
		var postPR = getPR(prId);
		if (userDto.getId() == postPR.getContributor().getId()
				|| userDto.getId() == postPR.getPost().getAuthor().getId()) {
			postPRRepository.setPRClosed(prId);
			return true;
		}
		else
			return false;
	}

	public boolean acceptPR(UUID id, UserPrincipal userPrincipal) {
		var user = userPrincipal.getUser();
		var userDto = userService.loadUserDtoByEmail(user.getEmail());
		PostPR postPR = postPRRepository.getOne(id);
		if (userDto.getId() == postPR.getPost().getAuthor().getId()) {
			EditPostDto editPostDto = EditPostDto.fromPostPR(postPR);
			postService.editPost(editPostDto);
			postPRRepository.setPRAccepted(id);
			return true;
		}
		else
			return false;
	}

	public List<PostPRListDto> getPostPRByPostId(UUID id, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		return postPRRepository.getPostPRByPostId(id, pageable).stream().map(PostPRMapper.MAPPER::postPRToPostPRList)
				.collect(Collectors.toList());
	}

	public boolean editPR(EditPostPRDto editPR, UserPrincipal userPrincipal) {
		var user = userPrincipal.getUser();
		var userDto = userService.loadUserDtoByEmail(user.getEmail());
		PostPR postPR = postPRRepository.getOne(editPR.getId());
		if (userDto.getId() == postPR.getContributor().getId()) {
			postPRRepository.updatePR(editPR.getId(), editPR.getTitle(), editPR.getText());
			tagRepository.deleteAllByPostPrId(editPR.getId());
			editPR.getTags().forEach(tagId -> tagRepository.saveTagToPr(editPR.getId(), tagId));
			return true;
		}
		return false;
	}

	public List<PostPRDetailsDto> getPostPRByUserId(UUID id, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		return postPRRepository.getPostPRByUserId(id, pageable).stream()
				.map(PostPRMapper.MAPPER::postPRToPostPRDetailsDto).collect(Collectors.toList());
	}

}
