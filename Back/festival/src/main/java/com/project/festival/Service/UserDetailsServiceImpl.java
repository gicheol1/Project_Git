package com.project.festival.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.User;
import com.project.festival.Entity.Repo.UserRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepo userRepository;
	
	// UserDetailsService 인터페이스를 구현한 클래스
	// Spring Security에서 사용자 상세 정보를 로드하기 위해 필요
	@Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		// 사용자 ID로 사용자를 찾기
		Optional<User> user = userRepository.findByMemId(id);
		
		User currentUser;

        // 사용자가 존재하는 경우
        if (user.isPresent()){
        	
        	//  해당 사용자 정보를 가져오기
        	currentUser = user.get();
        	
        } else {
            // 사용자를 찾지 못한 경우 예외 발생
            throw new UsernameNotFoundException("User not found with id: " + id);
        }

        // Spring Security UserDetails 객체를 생성하여 반환
        // 사용자 이름, ID, 비밀번호 및 역할(roles) 정보를 포함
        return org.springframework.security.core.userdetails.User
                .withUsername(currentUser.getName()) // 사용자 이름 설정
                .username(currentUser.getMemId()) // 사용자 ID 설정
                .password(currentUser.getPw()) // 사용자 비밀번호 설정
                .roles(currentUser.getRole().toString()) // 사용자 역할(roles) 설정
                .build();
    }
}
