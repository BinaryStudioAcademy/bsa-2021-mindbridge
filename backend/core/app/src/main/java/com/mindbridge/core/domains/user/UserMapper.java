package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.*;
import com.mindbridge.data.domains.follower.model.Follower;
import com.mindbridge.data.domains.user.model.User;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

	UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

	@Mapping(target = "postsQuantity", ignore = true)
	@Mapping(target = "commentsQuantity", ignore = true)
	@Mapping(target = "contributionsQuantity", ignore = true)
	@Mapping(target = "followersQuantity", ignore = true)
	@Mapping(target = "lastArticleTitles", ignore = true)
	@Mapping(target = "rating", ignore = true)
	@Mapping(target = "fullName", ignore = true)
	@Mapping(target = "followed", ignore = true)
	public abstract UserProfileDto userToUserProfileDto(User user);

	public abstract UserDto userToUserDto(User user);

	UserMentionsDto userToUserMentionsDto(User user);

	UserShortDto userToUserShortDto(User user);

	@Mapping(target = "follower.id", source = "followerId")
	@Mapping(target = "followed.id", source = "followedId")
	Follower FollowDtoToFollower(FollowDto followDto);
}
