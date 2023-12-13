package com.project.festival.component;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class RandomStringGenerator {
	
	// 인증 번호에 사용되는 문자
	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	// 생성될 인증 코드 길이
    private static final int CODE_LENGTH = 6;
	
	// 생성될 임시 비밀번호 길이
    private static final int TEMPORARY_PW_LENGTH = 15;

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    // 인증코드 전송
    public static String generateRandomString() {
    	
    	// 가변형 String 객체
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        
        // 난수 생성기
        Random random = new Random(System.currentTimeMillis());
        
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }
    
    // ----- ----- ----- ----- ----- ----- ----- ----- -----

    // 새 비밀번호 전송
    public static String generateRandomPW() {
    	
    	// 가변형 String 객체
        StringBuilder sb = new StringBuilder(TEMPORARY_PW_LENGTH);
        
        // 난수 생성기
        Random random = new Random(System.currentTimeMillis());
        
        for (int i = 0; i < TEMPORARY_PW_LENGTH; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }
}
