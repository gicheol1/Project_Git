package com.project.festival.Entity.Repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.Festival;

public interface FestivalRepo extends CrudRepository<Festival, Long> {
	
	List<Festival> findAll();

}
