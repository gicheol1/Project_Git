package com.project.festival.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.festival.Entity.Repo.UserRepo;

@Service
public class AuthService {

	private final UserRepo userRepository;
	
	private Map<String, String> verificationCodes = new HashMap<>(); // 이메일과 인증 코드를 저장할 맵
	
	public AuthService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }
 	
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	// 아이디 중복 검사
    public boolean idCheck(String userId) {
    	
    	// 존재하면 true 없으면 false
    	return userRepository.existsByMemId(userId);
	}
 	
// ----- ----- ----- ----- ----- ----- ----- ----- -----
    
	// 이메일과 인증 코드를 저장하는 메소드
    public void saveVerificationCode(String email, String verificationCode) {
        verificationCodes.put(email, verificationCode);
    }

    // 사용자가 입력한 인증 코드와 저장된 코드를 비교하는 메소드
    public boolean verifyCode(String email, String userInputCode) {
        String savedCode = verificationCodes.get(email);
        return savedCode != null && savedCode.equals(userInputCode);
    }
    
}
