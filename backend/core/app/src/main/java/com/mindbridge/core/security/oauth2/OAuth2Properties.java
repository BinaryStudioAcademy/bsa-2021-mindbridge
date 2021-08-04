<<<<<<< HEAD
package com.mindbridge.core.security.oauth2;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties("oauth2")
@Getter
@Setter
public class OAuth2Properties {

	private List<String> redirectUris;

}
=======
package com.mindbridge.core.security.oauth2;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties("oauth2")
@Getter
@Setter
public class OAuth2Properties {
	private List<String> redirectUris;
}
>>>>>>> ff40577a61e4fb36ca184a81fc852805286a3c44
