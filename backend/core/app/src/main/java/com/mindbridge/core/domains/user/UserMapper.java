package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.data.domains.user.model.User;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

	UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

	public abstract UserDto userToUserDto(User user);

}
