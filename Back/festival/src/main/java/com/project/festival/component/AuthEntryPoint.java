package com.project.festival.component;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthEntryPoint implements AuthenticationEntryPoint{
	
	@Override
	public void commence(
		HttpServletRequest request,
		HttpServletResponse response,
		AuthenticationException authException
		
	) throws IOException, ServletException{
		
		// 클라이언트에게 401 Unauthorized 상태 코드를 반환하고
		// 응답 형식을 JSON으로 설정
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		
		// 응답 데이터를 작성하기 위한 PrintWriter를 생성 후
		// 에러 메시지를 전송
		PrintWriter writer = response.getWriter();
		writer.println("Error: " + authException.getMessage());
	}
}
