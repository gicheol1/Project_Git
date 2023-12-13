package com.project.festival.Entity.board.RepositoryFile;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.board.File.FileQA;

public interface FileQARepo extends CrudRepository<FileQA, Long> {
	
	List<FileQA> findByBoardNumOrderByFileNum(Long boardNum);
	List<String> findFileNameByBoardNumOrderByFileNum(Long boardNum);
	
	void deleteByFileName(String fileName);
	
	void deleteAllByBoardNum(Long BoardNum);
	
}
