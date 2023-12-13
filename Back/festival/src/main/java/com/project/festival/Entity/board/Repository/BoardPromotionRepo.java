package com.project.festival.Entity.board.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Entity.BoardPromotion;
import com.project.festival.Entity.board.File.FilePromotion;

@Repository
public interface BoardPromotionRepo extends CrudRepository<BoardPromotion, Long> {

	Page<BoardPromotion> findAllByOrderByDateDesc(Pageable pageable);
	
	BoardPromotion findByBoardNum(Long boardNum);
	BoardPromotion findByBoardNumAndMemId(Long boardNum, String memId);
	
	List<FilePromotion> findFilesByBoardNum(Long boardNum);
	
	boolean existsByBoardNumAndMemId(Long boardNum, String memId);
}
