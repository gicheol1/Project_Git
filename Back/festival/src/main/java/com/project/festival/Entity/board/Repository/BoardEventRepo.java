package com.project.festival.Entity.board.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Entity.BoardEvent;

@Repository
public interface BoardEventRepo extends CrudRepository<BoardEvent, Long> {

	// 페이지별 날짜기준 내림차순으로 게시판 가져오기
	Page<BoardEvent> findAllByOrderByDateDesc(Pageable pageable);

	// 게시판 상세 정보 가져오기
	BoardEvent findByBoardNum(Long boardNum);
	BoardEvent findByBoardNumAndMemId(Long boardNum, String memId);

	// 게시판 소유주인지 확인하는
	boolean existsByBoardNumAndMemId(Long boardNum, String memId);
}
