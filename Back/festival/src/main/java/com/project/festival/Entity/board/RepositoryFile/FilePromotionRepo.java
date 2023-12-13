package com.project.festival.Entity.board.RepositoryFile;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.board.File.FilePromotion;

public interface FilePromotionRepo extends CrudRepository<FilePromotion, Long> {
	
	List<FilePromotion> findByBoardNumOrderByFileNum(Long boardNum);
	List<String> findFileNameByBoardNumOrderByFileNum(Long boardNum);
	
	void deleteByFileName(String fileName);
	
	void deleteAllByBoardNum(Long BoardNum);
	
}
