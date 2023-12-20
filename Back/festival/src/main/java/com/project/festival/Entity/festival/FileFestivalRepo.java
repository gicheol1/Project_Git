package com.project.festival.Entity.festival;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface FileFestivalRepo extends CrudRepository<FileFestival, Long> {
	
	List<FileFestival> findByFestivalNumOrderByFileNum(Long festivalNum);
	
	List<String> findFileNameByFestivalNumOrderByFileNum(Long festivalNum);
	
	void deleteByFileName(String fileName);
	void deleteAllByFestivalNum(Long festivalNum);
}
