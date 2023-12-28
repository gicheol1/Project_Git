package com.project.festival.Controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Entity.orther.EmailCode;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.EmailService;
import com.project.festival.Service.VerificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	private final EmailService emailService;
	private final VerificationService verService;
	
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	// 아이디 중복 체크
	@PostMapping("/idCheck/{id}")
	public ResponseEntity<?> idCheck(@PathVariable String id) {
		
		if(authService.idCheck(id)) {
			return ResponseEntity.ok()
    			.header("idCheckResult", "false")
    			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "idCheckResult")
    			.build();
			
		}
		
		return ResponseEntity.ok()
			.header("idCheckResult", "true")
			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "idCheckResult")
			.build();
		
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	// 이메일 인증코드 전송
	@PostMapping("/sendCode")
    public ResponseEntity<?> sendCode(@RequestBody EmailCode emailCode) {
		
        String code = verService.generateVerificationCode(emailCode.getEmail());
        
        if(code.equals("Duplication")) {
            return ResponseEntity.ok(false);
        }
        
        emailService.sendCode(emailCode.getEmail(), code);

        return ResponseEntity.ok(true);
    }

	// 인증번호 확인
    @PostMapping("/verifyCode")
    public ResponseEntity<?> verifyCode(@RequestBody EmailCode emailCode) {
    	
        boolean vResult = verService.verifyCode(emailCode.getEmail(), emailCode.getCode());
		
        return ResponseEntity.ok(vResult);
        
    }
	
}
