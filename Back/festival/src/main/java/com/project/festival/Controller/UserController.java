package com.project.festival.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Entity.User;
import com.project.festival.Entity.orther.UserIdEmail;
import com.project.festival.Entity.orther.UserNameEmail;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.EmailService;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthService authService;

	@Autowired
	private EmailService emailService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 회원가입
	@GetMapping("/getUserList")
	public ResponseEntity<?> getUserList(@RequestParam String jwt) {
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		return ResponseEntity.ok(userService.getUsers());
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 회원가입
	@PostMapping("/singUp")
	public ResponseEntity<?> singUp(@RequestBody User newUser) {
		
		// 가입일, 권한 설정
		newUser.singUpBasic();
		
		// DB 추가
		userService.saveUser(newUser);
		
		return ResponseEntity.ok().build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 회원 아이디 탐색
	@PostMapping("/findUserId")
	public ResponseEntity<?> findUserId(@RequestBody UserNameEmail user) {
		
		String _id = userService.findUserId(user.getEmail(), user.getName());
		
		// 회원이 존재하지 않은 경우
		if(_id.isEmpty()) {
			return ResponseEntity.ok()
				.header("findUserResult", "false")
    			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "findUserResult")
    			.build();
			
		}
		
		// 이메일로 전송
		emailService.sendUserId(user.getEmail(), _id);
		
		return ResponseEntity.ok()
			.header("findUserResult", "true")
			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "findUserResult")
			.build();
		
	}

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------
	
	// 회원 비밀번호 재발급
	@PostMapping("/resetPW")
	public ResponseEntity<?> resetPW(@RequestBody UserIdEmail user) {
		
		// 새 비밀번호 받기(회원이 존재하는 경우에만)
		String _pw = userService.resetPW(user.getMemId(), user.getEmail());
		
		// 회원이 존재하지 않은 경우
		if(_pw.isEmpty()) {
			return ResponseEntity.ok()
				.header("findUserResult", "false")
    			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "findUserResult")
				.build();
			
		}
		
		// 이메일로 전송
		emailService.sendNewPW(user.getEmail(), _pw);
		
		return ResponseEntity.ok()
			.header("findUserResult", "true")
			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "findUserResult")
			.build();
		
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// JWT로 회원 정보(비밀번호 제외) 가져오기
	@GetMapping("/getUser")
	public ResponseEntity<?> getUser(
		@RequestParam String jwt
	) {

		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// 토큰에 저장된 회원 아이디로 회원 정보 가져오기
		Optional<User> user = userService.getUserById(jwtService.getAuthUser(jwt).get("memId", String.class));
		
		// 없는 경우
		if(user.isEmpty()) { return ResponseEntity.ok(false); }
		
		// 비밀번호는 비공개
		User userInfo = user.get();
		userInfo.setPw("");

		return ResponseEntity.ok().body(userInfo);
	}
	
// ----- ----- ----- ----- ----- ----- ----- ----- -----
	
	// JWT로 관리자 확인
	@GetMapping("/isAdmin")
	public ResponseEntity<?> isAdmin(
		@RequestParam String jwt
	) {
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		String role = jwtService.getAuthUser(jwt).get("role", String.class);
		
		if(!role.equals("ADMIN")) { return ResponseEntity.ok(false); }

		return ResponseEntity.ok(true);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 회원수정 (비밀번호, 이메일, 주소)
	@PutMapping("/updateUser")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		
		userService.updateUser(user);
		
		return ResponseEntity.ok().build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 회원탈퇴
	@DeleteMapping("/deleteUser")
	public ResponseEntity<?> deleteUser(
		@RequestParam String memId,
		@RequestParam String jwt
	) {
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		userService.deleteUser(memId);

		return ResponseEntity.ok().build();
	}
}
