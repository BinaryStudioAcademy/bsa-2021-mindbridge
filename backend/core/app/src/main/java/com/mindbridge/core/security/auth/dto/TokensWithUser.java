package com.mindbridge.core.security.auth.dto;

import com.mindbridge.core.domains.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokensWithUser {

	AuthResponse tokens;

	UserDto user;

}
