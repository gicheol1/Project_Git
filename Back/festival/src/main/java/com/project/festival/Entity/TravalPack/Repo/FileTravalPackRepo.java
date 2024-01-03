package com.project.festival.Entity.TravalPack.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.festival.Entity.TravalPack.FileTravalPack;

public interface FileTravalPackRepo extends JpaRepository<FileTravalPack, Long> {
	
	List<FileTravalPack> findByPackNumOrderByFileNum(Long packNum);
	List<FileTravalPack> findAll();
	List<String> findFileNameByPackNumOrderByFileNum(Long PackNum);
	
	void deleteByFileName(String fileName);
	void deleteAllByPackNum(Long PackNum);
}
