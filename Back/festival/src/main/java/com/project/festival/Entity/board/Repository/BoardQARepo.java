package com.project.festival.Entity.board.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Entity.BoardQA;

@Repository
public interface BoardQARepo extends CrudRepository<BoardQA, Long> {

	// 페이지별 날짜기준 내림차순으로 게시판 가져오기
	Page<BoardQA> findAllByOrderByDateDesc(Pageable pageable);

	// 게시판 상세 정보 가져오기
	BoardQA findByBoardNum(Long boardNum);
	BoardQA findByBoardNumAndMemId(Long boardNum, String memId);

	// 게시판 소유주인지 확인하는
	boolean existsByBoardNumAndMemId(Long boardNum, String memId);
}
