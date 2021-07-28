package com.mindbridge.core.domains.user;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;


@Mapper
public interface UserMapper {
	UserMapper MAPPER = Mappers.getMapper(UserMapper.class);
}
