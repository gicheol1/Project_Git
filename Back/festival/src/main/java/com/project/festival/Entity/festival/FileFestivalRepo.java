package com.project.festival.Entity.festival;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface FileFestivalRepo extends CrudRepository<FileFestival, Long> {
	
	Optional<FileFestival> findByFestivalNum(Long festivalNum);
	
	
	List<FileFestival> findByFestivalNumOrderByFileNum(Long festivalNum);
	List<FileFestival> findAll();
	List<String> findFileNameByFestivalNumOrderByFileNum(Long festivalNum);
	
	void deleteByFileName(String fileName);
	void deleteAllByFestivalNum(Long festivalNum);
}
