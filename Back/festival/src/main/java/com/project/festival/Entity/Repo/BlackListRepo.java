package com.project.festival.Entity.Repo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.BlackList;

public interface BlackListRepo extends CrudRepository<BlackList, Long> {
	
	// 페이지별 날짜기준 내림차순으로 차단된 사용자 불러오기
	Page<BlackList> findByOrderByBanDateDesc(Pageable pageable);
	
	// User의 회원 아이디에 해당하는 차단 일자와 차단 사유 가져오기
	Optional<BlackList> findByUser_MemId(String MemId);
	
	// 아이디로 회원 차단 여부 확인
	boolean existsByUser_MemId(String MemId);
	
	// 아이디로 회원 차단 해제하기
	void deleteByUser_MemId(String MemId);
	
}
