package com.mindbridge.core.security;

import com.mindbridge.core.security.jwt.JwtFilter;
import com.mindbridge.core.security.oauth2.OAuth2SuccessHandler;
import com.mindbridge.core.security.oauth2.RedirectUriToCookiePersister;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableScheduling
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Value("${app.cors.allowed_origins}")
	private String[] corsAllowedOrigins;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.headers().frameOptions().sameOrigin()
			.and().cors()
			.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and().csrf().disable()
			.formLogin().disable()
			.httpBasic().disable()
			.authorizeRequests()
			.antMatchers("/ws/**").permitAll()
			.antMatchers("/swagger-resources/**").permitAll()
			.antMatchers("/v2/api-docs").permitAll()
			.antMatchers("/swagger-ui.html").permitAll()
			.antMatchers("/webjars/**").permitAll()
			.antMatchers("/auth/**", "/oauth2/**").permitAll()
			.antMatchers(HttpMethod.GET, "/search/**").permitAll()
			.antMatchers(HttpMethod.GET, "/achievement/byUser/*").permitAll()
			.antMatchers(HttpMethod.GET, "/post/*", "/post/all", "/post/title/*", "/post/drafts/*").permitAll()
			.antMatchers(HttpMethod.GET, "/postVersion/*", "/postVersion/all/*").permitAll()
			.antMatchers(HttpMethod.GET, "/user/*").permitAll()
			.antMatchers(HttpMethod.GET, "/data/*").permitAll()
			.antMatchers(HttpMethod.GET, "/tag/*").permitAll()
			.anyRequest().authenticated().and();

		applyOAuth2Config(http);

		http.addFilterBefore(filterChainExceptionHandler(), UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(tokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	private void applyOAuth2Config(HttpSecurity http) throws Exception {
		http
			.oauth2Login(oauth2Config -> oauth2Config
				.authorizationEndpoint(auth -> {
					auth.baseUri("/auth/oauth2/authorize");
					auth.authorizationRequestRepository(authorizationRequestRepository());
				})
				.redirectionEndpoint(redir -> redir.baseUri("/auth/oauth2/code/*"))
				.successHandler(oAuth2SuccessHandler()));
	}

	@Bean
	public JwtFilter tokenFilter() {
		return new JwtFilter();
	}

	@Bean
	public AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository() {
		return new RedirectUriToCookiePersister();
	}

	@Bean
	public FilterChainExceptionHandler filterChainExceptionHandler() {
		return new FilterChainExceptionHandler();
	}

	@Bean
	public OAuth2SuccessHandler oAuth2SuccessHandler() {
		return new OAuth2SuccessHandler();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		for (String allowedOrigin : corsAllowedOrigins) {
			config.addAllowedOrigin(allowedOrigin);
		}
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", config);
		return source;
	}

}
