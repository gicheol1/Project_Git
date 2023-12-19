package com.project.festival.Service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.BlackList;
import com.project.festival.Entity.User;
import com.project.festival.Entity.Repo.BlackListRepo;
import com.project.festival.Entity.Repo.UserRepo;
import com.project.festival.component.RandomStringGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepo userRepository;
	private final BlackListRepo blackListRepository;
    private final PasswordEncoder passwordEncoder;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 회원가입
    public void saveUser(User newUser) {
    	
    	// 사용자의 평문 상태의 비밀번호를 BCrypt로 암호화
        String encodedPassword = passwordEncoder.encode(newUser.getPw());
        
        // 임호화된 비밀번호를 객체에 저장
        newUser.setPw(encodedPassword);
        
        // 객체를 DB에 저장
        userRepository.save(newUser);
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 회원 정보 수정
    public void updateUser(User newUser) {
    	
    	// 기존의 회원 정보 가져오기
    	Optional<User> _user = userRepository.findByMemId(newUser.getMemId());
    	User beforUser = new User();
    	
    	// 비밀번호 변경시(null이 아닌 경우)
    	if(!newUser.getPw().isEmpty()) {
    		newUser.setPw(passwordEncoder.encode(newUser.getPw()));
    	}
    	
    	if(_user.isPresent()) {
    		beforUser = _user.get();
    		newUser.changeUser(beforUser);
    		
    	}
        
        userRepository.save(newUser);
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 회원 아이디 탐색
    public String findUserId(String email, String name) {
    	
    	Optional<String> targetUser_id = userRepository.findMemIdByEmailAndName(email, name);
    	
    	if(targetUser_id.isPresent()) {
    		return targetUser_id.get();

    	// 존재하지 않은 회원
    	} else {
    		return "";
    		
    	}
    	
    }

    // 회원 비밀번호 재발급
    public String resetPW(String memId, String email) {
    	
    	// 회원 정보 탐색
    	Optional<User> newPwUser = userRepository.findByMemIdAndEmail(memId, email);
    	
    	// 수정된 비밀번호를 적용하기 위한 객체
    	User newUser;
    	
    	// 새 비밀번호
    	String newPW;
    	String newPWEncoded;
    	
    	// 회원이 존재하는 경우
    	if(newPwUser.isPresent()) {
    		
    		newUser = newPwUser.get();
    		
    		// 새 15자리 비밀번호 생성
    		newPW = RandomStringGenerator.generateRandomPW();
        	
        	// 생성한 비밀번호를 암호화
    		newPWEncoded = passwordEncoder.encode(newPW);
    		newUser.setPw(newPWEncoded);
    		
    		// 새 비밀번호를 저장
    		userRepository.save(newUser);
    		
    		return newPW;
        	
    	
    	}
    	
    	// 존재하지 않은 회원
    	return "";
    	
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 회원 정보 조회
    public Optional<User> findUser(String memId) {
    	
    	return userRepository.findByMemId(memId);
    }
    
    // 차단된 회원 조회
    public Optional<BlackList> findBlockedUser(String memId) {
    	
    	return blackListRepository.findByUser_MemId(memId);
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 회원탈퇴
    public void deleteUser(String memId) {
    	
    	// 사용자의 아이디와 일치하는 데이터 삭제
    	userRepository.deleteByMemId(memId);
    }

}
