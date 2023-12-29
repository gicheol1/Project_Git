package com.project.festival.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.festival.Entity.Repo.UserRepo;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final JwtService jwtService;

	private final UserRepo userRepository;
	
	private Map<String, String> verificationCodes = new HashMap<>(); // 이메일과 인증 코드를 저장할 맵
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 아이디 중복 검사
    public boolean idCheck(String memId) {
    	
    	// 존재하면 true 없으면 false
    	return userRepository.existsByMemId(memId);
	}
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
	// 이메일과 인증 코드를 저장하는 메소드
    public void saveVerificationCode(String email, String verificationCode) {
        verificationCodes.put(email, verificationCode);
    }

    // 사용자가 입력한 인증 코드와 저장된 코드를 비교하는 메소드
    public boolean verifyCode(String email, String userInputCode) {
        String savedCode = verificationCodes.get(email);
        return savedCode != null && savedCode.equals(userInputCode);
    }
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 로그인 상태를 확인하는 메소드
    public boolean isLogin(String jwt) {
		
    	// 토큰이 없는 경우
		if(jwt == null) { return false; }
		
		Claims claims;
		
		try { claims = jwtService.getAuthUser(jwt); }
		catch(Exception e) { return false; }
		
		// 토큰 만료시
		if(claims.isEmpty() || !jwtService.isExistsByJti(claims.get("jti", String.class))) { return false; }
		
		// 비회원인 경우
		if(!userRepository.existsByMemId(claims.get("memId", String.class))) { return false; }
		
		return true;
    }
    
    // 관리자 상태를 확인하는 메소드
    public boolean isAdmin(String jwt) {
		
    	// 토큰이 없는 경우
		if(jwt == null) { return false; }
		
		Claims claims;
		
		try { claims = jwtService.getAuthUser(jwt); }
		catch(Exception e) { e.printStackTrace(); return false; }
		
		// 토큰 만료시
		if(claims.isEmpty() || !jwtService.isExistsByJti(claims.get("jti", String.class))) { return false; }
		
		// 관리자가 아닌경우
		if(!(claims.get("role", String.class) != "ADMIN")) { return false; }
		
		return true;
    }
    
}
