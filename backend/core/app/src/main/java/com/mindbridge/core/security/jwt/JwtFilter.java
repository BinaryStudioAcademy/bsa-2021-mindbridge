package com.mindbridge.core.security.jwt;

import com.mindbridge.core.domains.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.util.StringUtils.hasText;

public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private UserService userService;
	private final String[] EXCLUDED_PATHS = new String[]{
		"/auth"
	};

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		for (String excludedPath : EXCLUDED_PATHS) {
			if (request.getRequestURI().startsWith(excludedPath)) {
				return true;
			}
		}
		return false;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String token = getTokenFromRequest(request);
		if (token != null) {
			String userLogin = jwtProvider.getLoginFromToken(token);
			var userDetails = userService.loadUserByUsername(userLogin);
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		filterChain.doFilter(request, response);
	}

	private String getTokenFromRequest(HttpServletRequest request) {
		String bearer = request.getHeader("authorization");
		if (hasText(bearer) && bearer.startsWith("Bearer ")) {
			return bearer.substring(7);
		}
		return null;
	}
}
