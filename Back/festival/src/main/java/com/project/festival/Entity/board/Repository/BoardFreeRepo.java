package com.project.festival.Entity.board.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Entity.BoardFree;
import com.project.festival.Entity.board.File.FileFree;

@Repository
public interface BoardFreeRepo extends CrudRepository<BoardFree, Long> {
	
	Page<BoardFree> findAllByOrderByDateDesc(Pageable pageable);

	BoardFree findByBoardNum(Long boardNum);
	BoardFree findByBoardNumAndMemId(Long boardNum, String memId);
	
	List<FileFree> findFilesByBoardNum(Long boardNum);
	
	boolean existsByBoardNumAndMemId(Long boardNum, String memId);
}
