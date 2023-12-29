package com.project.festival.component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.festival.Service.JwtService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private JwtService jwtService;
	
//	private final String loginUrl = "/login"; // 로그인 페이지 URL

	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain
	) throws ServletException, IOException {
		
		// 요청받은 'AUTHORIZATION'해더에 있는 토큰 가져오기
		String jws = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(jws != null) {
			
            // 토큰을 확인하고 사용자를 얻음
			Claims user = jwtService.getAuthUser(request);
            
			// 사용자의 ID와 역할 정보를 추출
            String username = user.get("memId", String.class);
            String rolesString = user.get("role", String.class);
			
			// 역할 정보를 쉼표로 분리하여 리스트로 변환
            List<String> roles = Arrays.asList(rolesString.split(","));

            // 사용자의 역할을 Spring Security의 GrantedAuthority 형식으로 변환
            List<GrantedAuthority> authorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // "ROLE_" 접두사를 추가
                    .collect(Collectors.toList());
			
            // 사용자 정보와 권한을 가지고 인증 객체를 생성
			Authentication authentication =
				new UsernamePasswordAuthenticationToken(username, null, authorities);
			
			// SecurityContextHolder에 인증 객체를 설정하여 인증 상태를 유지
			SecurityContextHolder.getContext()
				.setAuthentication(authentication);
		}
		
		// 다음 필터로 요청과 응답을 전달합니다.
		filterChain.doFilter(request, response);
	}
}