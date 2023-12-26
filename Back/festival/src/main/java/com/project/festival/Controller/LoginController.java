package com.project.festival.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Entity.User;
import com.project.festival.Entity.orther.AccountCredentials;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.LoginService;
import com.project.festival.Service.UserService;

import io.jsonwebtoken.Claims;

@RestController
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserService userService;

	@Autowired
	private AuthService authService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 로그인
	@PostMapping("/login")
	public ResponseEntity<?> logIn(
		@RequestBody AccountCredentials credentials
	){
		
		// 회원 등록 여부 확인 후 토큰 전달
		String jwts = loginService.logInToken(credentials);
		
		// 없거나 일치하지 않은 경우
		if(jwts == null || jwts.equals("Failed")) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok()
			.header(HttpHeaders.AUTHORIZATION, jwts)
		    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization") // 헤더 노출 설정
		    .build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 로그인 상태 확인 
	@GetMapping("/checkIsLogin")
	public ResponseEntity<?> checkIsLogin(
		@RequestParam String jwt
	){
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.notFound().build(); }
		
		String memId = jwtService.getAuthUser(jwt).get("memId", String.class);
		User _user = userService.getUserByIdToken(memId);
		
		// 새 토큰 전달
		String newJwt = jwtService.getToken(_user);
		
		return ResponseEntity.ok()
				.header(HttpHeaders.AUTHORIZATION, newJwt)
			    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization") // 헤더 노출 설정
			    .build();
		
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 로그아웃
	@PostMapping("/logOut")
	public ResponseEntity<?> logOut(
			@RequestParam String jwt
	){
		
		// 저장된 토큰 정보 제거
		loginService.logOutToken(jwt);
		
		return ResponseEntity.ok().build();
	}
}
