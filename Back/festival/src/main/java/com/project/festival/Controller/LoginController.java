package com.project.festival.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Entity.User;
import com.project.festival.Entity.orther.AccountCredentials;
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

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 로그인
	@PostMapping("/login")
	public ResponseEntity<?> logIn(@RequestBody AccountCredentials credentials){
		
		// 회원 등록 여부 확인 후 토큰 전달
		String jwts = loginService.logInToken(credentials);
		
		// 없거나 일치하지 않은 경우
		if(jwts != null && jwts.equals("Failed")) {
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
		
		Claims claims;
		
		try {
			claims = jwtService.getAuthUser(jwt);
			
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			
		}
		
		
		String memId = claims.get("memId", String.class);
		String jti = claims.get("jti", String.class);
		
		// 토큰 만료시
		if(claims.isEmpty() && !jwtService.isExistsByJti(jti)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		Optional<User> _user = userService.findUser(memId);
		
		// 비회원인 경우
		if(_user.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		// 모든 조건을 충족하면 새 토큰 전달
		String newJwt = jwtService.getToken(_user.get());
		
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