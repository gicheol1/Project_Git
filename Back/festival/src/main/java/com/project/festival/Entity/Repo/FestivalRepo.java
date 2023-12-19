package com.project.festival.Entity.Repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.Festival;

public interface FestivalRepo extends CrudRepository<Festival, Long> {
	
	List<Festival> findAll();
	
	Page<Festival> findAllByOrderByFNumDesc(Pageable pageable);
	
	Festival findByFNum(Long fNum);

}
