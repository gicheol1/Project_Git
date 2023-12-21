package com.project.festival.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.User;
import com.project.festival.Entity.Repo.UserRepo;
import com.project.festival.Entity.orther.AccountCredentials;

@Service
public class LoginService {

	@Autowired
    private UserRepo userRepository;

	@Autowired
    private JwtService jwtService;

	@Autowired
    private PasswordEncoder passwordEncoder;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 로그인 시 토큰 생성 및 전달
    public String logInToken(AccountCredentials credentials) {
    	
    	String _memId=credentials.getMemId();
    	String _pw=credentials.getMemId();
    	
        Optional<User> _user = userRepository.findById(_memId);
        
        // 없거나 일치하지 않은 경우
        if (_user.isEmpty() || !passwordEncoder.matches(_pw, _user.get().getPw())) {
            return "Failed";
        }
        
        User user = _user.get();
        
        // 토큰 생성
        return jwtService.getToken(user);
    }
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 로그아웃시 토큰 정보 삭제
    public void logOutToken(String jwt) {
    	
    	// 토큰을 통해 식별 번호 받기
    	String jti = jwtService.getAuthUser(jwt).get("jti", String.class);
    	
    	if(!jti.isEmpty()) {
    		jwtService.deleteTokenByJti(jti);
    	}
    	
    }
}
