package com.project.festival.Entity.TravalPack.Repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.project.festival.Entity.TravalPack.TravalPack;

public interface TravalPackRepository extends CrudRepository<TravalPack, Long> {
	
	// 페이지별 패키지 여행 가져오기
	Page<TravalPack> findAll(Pageable pageable);
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
	
	// 페이지별 기간에 맟는 패키지 여행 가져오기
    @Query("SELECT tp FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day")
    Page<TravalPack> findAllByDateDifference(Pageable pageable, List<Integer> days);
    
    @Query("SELECT COUNT(tp) FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day")
    long countByDateDifference(List<Integer> days);
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
    
    // 페이지별 특정 위치의 패키지 여행 가져오기
    Page<TravalPack> findByAddressContaining(Pageable pageable, String address);
    
    long countByAddressContaining(String addresses);
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
    
    // 페이지별 검색어에 맟는 패키지 여행 가져오기
    Page<TravalPack> findByNameContaining(Pageable pageable, String search);
    
    long countByNameContaining(String search);
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
	
	// 페이지별 기간에 맟는 패키지 여행 가져오기
    @Query("SELECT tp FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day AND tp.name LIKE %:search%")
    Page<TravalPack> findAllByDateDifferenceAndNameContaining(Pageable pageable, List<Integer> days, String search);
    
    @Query("SELECT COUNT(tp) FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day AND tp.name LIKE %:search%")
    long countByDateDifferenceAndNameContaining(List<Integer> days, String search);
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
    
    // 페이지별 특정 위치의 패키지 여행 가져오기
    Page<TravalPack> findByAddressContainingAndNameContaining(Pageable pageable, String address, String search);
    
    long countByAddressContainingAndNameContaining(String addresses, String search);
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 페이지별 특정 위치의 기간에 맟는 패키지 여행 가져오기
    @Query("SELECT tp FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day AND tp.address LIKE %:address%")
    Page<TravalPack> findAllByDateDifferenceAndAddressContaining(Pageable pageable, List<Integer> days, String address);
    
    @Query("SELECT COUNT(tp) FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day AND tp.address LIKE %:addresses%")
    long countByDateDifferenceAndAddressContaining(List<Integer> days, String addresses);
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 페이지별 특정 위치의 기간과 검색어에 맟는 패키지 여행 가져오기
    @Query("SELECT tp FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day AND tp.address LIKE %:address% AND tp.name LIKE %:search%\"")
    Page<TravalPack> findAllByDateDifferenceAndAddressContainingAndNameContaining(Pageable pageable, List<Integer> days, String address, String search);
    
    @Query("SELECT COUNT(tp) FROM TravalPack tp WHERE DATEDIFF(tp.endDate, tp.startDate) IN :day AND tp.address LIKE %:addresses% AND tp.name LIKE %:search%\"")
    long countByDateDifferenceAndAddressContainingAndNameContaining(List<Integer> days, String addresses, String search);
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
    // 패키지 번호로 가져오기
	TravalPack findByPackNum(Long packNum);
	
}
