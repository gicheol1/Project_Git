package com.project.festival.Entity.TravalPack.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.festival.Entity.TravalPack.TravalPack;

public interface TravalPackRepository extends JpaRepository<TravalPack, Long> {
	
	TravalPack findByPackNum(Long packNum);

	Long findPackNumByPackNum(Long packNum);
}
