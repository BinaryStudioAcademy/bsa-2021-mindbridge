<<<<<<< HEAD
package com.mindbridge.core.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@ConfigurationProperties(prefix = "jwt")
@Configuration
public class JwtProperties {

	private String secret;

	private Long secs_to_expire_access;

	private Long secs_to_expire_refresh;

}
=======
package com.mindbridge.core.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@ConfigurationProperties(prefix = "jwt")
@Configuration
public class JwtProperties {
	private String secret;
	private Long secs_to_expire_access;
	private Long secs_to_expire_refresh;
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
