package com.project.festival.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private VerificationService verService;
	
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	// 아이디 중복 체크
	@PostMapping("/idCheck")
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
        	return ResponseEntity.notFound().build();
        }
        
        emailService.sendCode(emailCode.getEmail(), code);
		
		return ResponseEntity.ok().build();
    }

	// 인증번호 확인
    @PostMapping("/verifyCode")
    public ResponseEntity<?> verifyCode(@RequestBody EmailCode emailCode) {
    	
        boolean vResult = verService.verifyCode(emailCode.getEmail(), emailCode.getCode());
		
        if(vResult) {
        	return ResponseEntity.ok()
    			.header("verifyResult", "true")
    			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "verifyResult")
    			.build();
        }
        
    	return ResponseEntity.ok()
			.header("verifyResult", "false")
			.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "verifyResult")
			.build();
        
    }
	
}
