package com.project.festival.Entity.board.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Entity.BoardNotic;
import com.project.festival.Entity.board.File.FileNotic;

@Repository
public interface BoardNoticRepo extends CrudRepository<BoardNotic, Long> {

	Page<BoardNotic> findAllByOrderByDateDesc(Pageable pageable);
	
	BoardNotic findByBoardNum(Long boardNum);
	BoardNotic findByBoardNumAndMemId(Long boardNum, String memId);
	
	List<FileNotic> findFilesByBoardNum(Long boardNum);
	
	boolean existsByBoardNumAndMemId(Long boardNum, String memId);
}
