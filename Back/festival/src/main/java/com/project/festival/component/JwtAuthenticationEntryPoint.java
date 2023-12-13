package com.project.festival.component;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final String loginUrl = "/login"; // 로그인 페이지 URL

    @Override
    public void commence(
		HttpServletRequest request,
		HttpServletResponse response,
        AuthenticationException authException
    ) throws IOException, ServletException {
        // 만료된 토큰 또는 인증 실패로 인한 예외 발생 시 로그인 페이지로 리디렉션
        response.sendRedirect(loginUrl);
    }
}
