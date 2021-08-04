<<<<<<< HEAD
package com.mindbridge.core.domains.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserDto {

	private UUID id;

	private String nickname;

	private String avatar;

	private String firstName;

	private String lastName;

}
=======
package com.mindbridge.core.domains.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserDto {
	private UUID id;
	private String email;
	private String firstName;
	private String lastName;
	private boolean emailVerified;
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
