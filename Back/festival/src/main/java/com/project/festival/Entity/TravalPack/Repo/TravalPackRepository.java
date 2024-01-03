package com.project.festival.Entity.TravalPack.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.TravalPack.TravalPack;

public interface TravalPackRepository extends CrudRepository<TravalPack, Long> {
	
    // 패키지 번호로 가져오기
	TravalPack findByPackNum(Long packNum);

	@Query("SELECT t.packNum FROM TravalPack t")
	List<Long> findAllPackNumBy();
	
}
