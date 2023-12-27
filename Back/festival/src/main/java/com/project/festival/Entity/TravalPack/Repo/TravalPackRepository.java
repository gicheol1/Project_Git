package com.project.festival.Entity.TravalPack.Repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.festival.Entity.TravalPack.TravalPack;

public interface TravalPackRepository extends JpaRepository<TravalPack, Long> {
	
	// 페이지별 날짜기준 내림차순으로 게시판 가져오기
	Page<TravalPack> findAllByOrderBySingupDateDesc(Pageable pageable);
	
    @Query("SELECT tp FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) = :date")
    Page<TravalPack> findAllWithDateDifference(Pageable pageable, int date);
    
    @Query("SELECT COUNT(tp) FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) = :dateDifference")
    long countByDateDifference(int dateDifference);
	
	TravalPack findByPackNum(Long packNum);

	Long findPackNumByPackNum(Long packNum);
}
