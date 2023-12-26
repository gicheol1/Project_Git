package com.project.festival.Entity.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.BlackList;

public interface BlackListRepo extends CrudRepository<BlackList, Long> {
	
	// 모든 차단된 사용자 불러오기
	List<BlackList> findAll();
	
	// User의 회원 아이디에 해당하는 차단 일자와 차단 사유 가져오기
	Optional<BlackList> findByUser_MemId(String MemId);
	
}
