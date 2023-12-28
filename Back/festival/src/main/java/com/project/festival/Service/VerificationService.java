package com.project.festival.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.festival.Entity.Repo.UserRepo;
import com.project.festival.component.RandomStringGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VerificationService {
	
	private final UserRepo userRepository;

	// 이메일과 생성된 인증코드를 저장하는 해쉬맵(파이썬의 dict타입과 동일)
    private final Map<String, String> veriCodes = new HashMap<>();
	
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====

    public String generateVerificationCode(String email) {
    	
    	// 이미 등록된 이메일인 경우
    	if(userRepository.existsByEmail(email)) {return "Duplication";}
    	
    	// 코드 생성
        String code = RandomStringGenerator.generateRandomString();
        
        // 해쉬맵에 email명으로 코드를 저장
        veriCodes.put(email, code);
        
        return code;
    }
    
// ----- ----- ----- ----- ----- ----- ----- ----- -----

    public boolean verifyCode(String email, String code) {
    	
    	// 해쉬맵에 저장된 코드를 불러오기
        String savedCode = veriCodes.get(email);
        
        // 코드가 null이 아니면
    	if(savedCode != null) {
    		
            // 입력한 코드가 일치한 경우
    		if(savedCode.equals(code)) {
    			
    			// 맵에 저장된 코드를 지우고 true 반환
    			veriCodes.remove(email);
        		return true;
    		}
    	}
    	
    	return false;
    }

}
