package com.project.festival.Entity.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.User;

@Repository
public interface UserRepo extends CrudRepository<User, String> {
	
	// 페이지별로 관리자를 제외한 회원 리스트 가져오기
    Page<User> findByRoleNotOrderBySingupDateDesc(String role, Pageable pageable);
    
	// 관리자를 제외한 회원의 수
    long countByRoleNot(String role);
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 관리자를 제외한 회원 리스트 가져오기
	List<User> findByRoleNot(String role);
	
	// 일치하는 회원의 아이디 가져오기
	String findMemIdByMemId(String memId);
	
	// 일치하는 회원의 정보 가져오기
	Optional<User> findByMemId(String memId);
	
	List<User> findAll();
	
	// 회원 아이디, 이메일 존재 확인
	boolean existsByMemId(String memId);
	boolean existsByEmail(String email);
	
	// 회원 권한 가져오기
	String findRoleByMemId(String memId);
	
	// 특정 회원의 아이디 가져오기
	@Query(
		"SELECT u.id FROM User u " +
		"WHERE u.name = :name " + 
		"AND u.email = :email"
	)
	Optional<String> findMemIdByEmailAndName(
		@Param("email") String email,
		@Param("name") String name
	);
	
	// 일치하는 회원 가져오기
	Optional<User> findByMemIdAndEmail(String memId, String email);

	// 특정 회원만 삭제하기
	void deleteByMemId(String memId);
}
