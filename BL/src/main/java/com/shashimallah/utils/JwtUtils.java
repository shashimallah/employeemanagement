package com.shashimallah.utils;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.shashimallah.models.Employee;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {

	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${employeemanagement.jwtSecret}")
	private String jwtSecret;

	@Value("${employeemanagement.jwtExpirationMs}")
	private Integer jwtExpirationMs;

	public String generateJwtToken(Authentication authentication) {
		logger.debug("Inside method generateJwtToken()");
		Employee empPrincipal = (Employee) authentication.getPrincipal();
		Date expirationTime = new Date(new Date().getTime() + jwtExpirationMs);
		return Jwts.builder().setSubject((empPrincipal.getUsername())).setIssuedAt(new Date())
				.setExpiration(expirationTime).signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public String getUserNameFromJwtToken(String token) {
		logger.debug("Inside method getUserNameFromJwtToken()");
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken) {
		logger.debug("Inside method validateJwtToken()");
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			logger.debug("Successfully validated token: " + authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}
		return false;
	}

}
