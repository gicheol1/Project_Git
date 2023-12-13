package com.project.festival.Entity.board.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Entity.BoardQA;
import com.project.festival.Entity.board.File.FileQA;

@Repository
public interface BoardQARepo extends CrudRepository<BoardQA, Long> {

	Page<BoardQA> findAllByOrderByDateDesc(Pageable pageable);
	
	BoardQA findByBoardNum(Long boardNum);
	BoardQA findByBoardNumAndMemId(Long boardNum, String memId);
	
	List<FileQA> findFilesByBoardNum(Long boardNum);
	
	boolean existsByBoardNumAndMemId(Long boardNum, String memId);
}
