package com.project.festival.Entity.festival;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface FestivalRepo extends CrudRepository<Festival, Long> {
	
	List<Festival> findAll();

	@Query("SELECT f.festivalNum FROM Festival f")
	List<Long> findAllFestivalNumBy();
	
	Page<Festival> findAllByOrderByFestivalNumDesc(Pageable pageable);
	
	Optional<Festival> findByFestivalNum(Long festivalNum);
	
	void deleteByFestivalNum(Long festivalNum);

}
