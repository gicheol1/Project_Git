package com.project.festival.Entity.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.User;
import com.project.festival.Entity.festival.Festival;

@Repository
public interface UserRepo extends CrudRepository<User, String> {
	
	// 회원 정보 가져오기
	List<User> findMemIdAndNameAndPhonNumAndSingupDateByRoleNot(String role);
	
	// 일치하는 회원 가져오기
	String findMemIdByMemId(String memId);
	
	// 일치하는 회원 가져오기
	Optional<User> findByMemId(String memId);
	
	List<User> findAll();
	
	// 회원 아이디가 존재하는지 확인
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

	void deleteByMemId(User user);
}
