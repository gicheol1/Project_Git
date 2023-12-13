package com.project.festival.Entity.board.RepositoryFile;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.board.File.FileEvent;

public interface FileEventRepo extends CrudRepository<FileEvent, Long> {
	
	List<FileEvent> findByBoardNumOrderByFileNum(Long boardNum);
	List<String> findFileNameByBoardNumOrderByFileNum(Long boardNum);
	
	void deleteByFileName(String fileName);
	
	void deleteAllByBoardNum(Long BoardNum);
	
}
