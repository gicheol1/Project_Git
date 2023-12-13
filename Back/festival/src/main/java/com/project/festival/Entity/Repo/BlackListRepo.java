package com.project.festival.Entity.Repo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.BlackList;

public interface BlackListRepo extends CrudRepository<BlackList, Long> {
	
	// User의 회원 아이디에 해당하는 차단 일자와 차단 사유 가져오기
	Optional<BlackList> findByUser_MemId(String MemId);
}
