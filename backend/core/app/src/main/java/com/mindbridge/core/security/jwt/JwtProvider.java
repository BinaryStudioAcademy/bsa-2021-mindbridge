package com.mindbridge.core.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Clock;
import java.time.ZonedDateTime;
import java.util.Date;

@Component
public class JwtProvider {

	private final JwtProperties jwtProperties;

	private Key secretKey;

	private JwtParser jwtParser;

	@Autowired
	public JwtProvider(JwtProperties jwtProperties) {
		this.jwtProperties = jwtProperties;
	}

	private Key key() {
		if (secretKey == null) {
			byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecret());
			secretKey = Keys.hmacShaKeyFor(keyBytes);
		}
		return secretKey;
	}

	private JwtParser jwtParser() {
		if (jwtParser == null) {
			jwtParser = Jwts.parser().setSigningKey(key());
		}
		return jwtParser;
	}

	private Date generateTokenDate(long seconds) {
		return Date.from(ZonedDateTime.now(Clock.systemUTC()).plusSeconds(seconds).toInstant());
	}

	private String generateToken(String username, long seconds) {
		return Jwts.builder().setSubject(username).setExpiration(generateTokenDate(seconds)).signWith(key()).compact();
	}

	public String generateAccessToken(String username) {
		return generateToken(username, jwtProperties.getSecs_to_expire_access());
	}

	public String generateRefreshToken(String username) {
		return generateToken(username, jwtProperties.getSecs_to_expire_refresh());
	}

	public String getLoginFromToken(String token) {
		Claims claims = parseToken(token);
		return claims.getSubject();
	}

	private Claims parseToken(String token) {
		try {
			return jwtParser().parseClaimsJws(token).getBody();
		}
		catch (ExpiredJwtException expEx) {
			throw new JwtException("Token expired", "jwt-expired");
		}
		catch (UnsupportedJwtException unsEx) {
			throw new JwtException("Unsupported jwt", "jwt-unsupported");
		}
		catch (MalformedJwtException mjEx) {
			throw new JwtException("Malformed jwt", "jwt-malformed");
		}
		catch (SignatureException sEx) {
			throw new JwtException("Invalid signature", "jwt-signature");
		}
		catch (Exception e) {
			throw new JwtException("Invalid token", "jwt-invalid");
		}
	}

}
