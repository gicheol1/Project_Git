package com.project.festival.Entity.board.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Entity.BoardEvent;
import com.project.festival.Entity.board.File.FileEvent;

@Repository
public interface BoardEventRepo extends CrudRepository<BoardEvent, Long> {

	Page<BoardEvent> findAllByOrderByDateDesc(Pageable pageable);
	
	BoardEvent findByBoardNum(Long boardNum);
	BoardEvent findByBoardNumAndMemId(Long boardNum, String memId);
	
	List<FileEvent> findFilesByBoardNum(Long boardNum);
	
	boolean existsByBoardNumAndMemId(Long boardNum, String memId);
}
