package com.project.festival.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.User;
import com.project.festival.Entity.Repo.UserRepo;
import com.project.festival.component.RandomStringGenerator;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 페이지별 관리자를 제외한 회원 리스트 출력
    public List<User> getUserListPage(Pageable pageable) {
    	
    	List<User> _user = new ArrayList<>();
    	
    	// 비밀번호 비공개 처리
    	for(User u : userRepository.findByRoleNotOrderBySingupDateDesc("ADMIN", pageable).getContent()) {
    		u.setPw(null);
    		_user.add(u);
    	}
    	
        return _user;
    }

	// 관리자를 제외한 회원의 수
    public long getUserCnt() { return userRepository.countByRoleNot("ADMIN"); }

    // 회원 정보 조회
    public Optional<User> getUserById(String memId) { return userRepository.findByMemId(memId); }
    
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
    public void updateUser(User updateUser) {
    	
    	// 기존의 회원 정보 가져오기
    	Optional<User> _user = userRepository.findByMemId(updateUser.getMemId());
    	User beforUser = new User();
    	
    	// 비밀번호 변경시(null이 아닌 경우)
    	if(!updateUser.getPw().isEmpty()) {
    		updateUser.setPw(passwordEncoder.encode(updateUser.getPw()));
    	}
    	
    	// 기존 정보에서 수정된 필드만 변경
    	if(_user.isPresent()) {
    		beforUser = _user.get();
    		updateUser.changeUser(beforUser);
    	}
        
    	// 수정된 정보 저장(수정시 memId가 같아야 한다.)
        userRepository.save(updateUser);
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 회원 아이디 탐색
    public String findUserId(String email, String name) {
    	
    	Optional<String> targetUser_id = userRepository.findMemIdByEmailAndName(email, name);
    	
    	// 회원이 존재하는 경우
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
    	Optional<User> _user = userRepository.findByMemIdAndEmail(memId, email);
    	
    	// 회원이 존재하는 경우
    	if(_user.isPresent()) {
        	
        	// 수정된 비밀번호를 적용하기 위한 객체
        	User newUser;
        	
        	// 새 비밀번호
        	String newPW;
        	String newPWEncoded;
    		
    		newUser = _user.get();
    		
    		// 새 15자리 비밀번호 생성
    		newPW = RandomStringGenerator.generateRandomPW();
        	
        	// 생성한 비밀번호를 암호화
    		newPWEncoded = passwordEncoder.encode(newPW);
    		newUser.setPw(newPWEncoded);
    		
    		// 새 비밀번호를 저장
    		userRepository.save(newUser);
    		
    		// 생성된 비밀번호 반환
    		return newPW;
        	
    	
    	} else {
        	// 존재하지 않은 회원
        	return "";
    	}
    	
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 회원탈퇴
    @Transactional
    public void deleteUser(String memId) { userRepository.deleteByMemId(memId); }

}
