package com.project.festival.Entity.Repo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Constant.Role;
import com.project.festival.Entity.User;

@Repository
public interface UserRepo extends CrudRepository<User, String> {
	
	// 페이지별로 관리자를 제외한 회원 리스트 가져오기
    Page<User> findByRoleNot(Role role, Pageable pageable);
    
	// 관리자를 제외한 회원의 수
    long countByRoleNot(Role role);
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 일치하는 회원의 아이디 가져오기
	String findMemIdByMemId(String memId);
	
	// 일치하는 회원의 정보 가져오기
	Optional<User> findByMemId(String memId);
	
	// 회원 아이디, 이메일 존재 확인
	boolean existsByMemId(String memId);
	boolean existsByEmail(String email);
	
	// 회원 권한 가져오기
	String findRoleByMemId(String memId);
	
	// 특정 회원의 아이디 가져오기
	Optional<String> findMemIdByNameAndEmail(String name, String email);
	
	// 일치하는 회원 가져오기
	Optional<User> findByMemIdAndEmail(String memId, String email);

	// 특정 회원만 삭제하기
	void deleteByMemId(String memId);
}
