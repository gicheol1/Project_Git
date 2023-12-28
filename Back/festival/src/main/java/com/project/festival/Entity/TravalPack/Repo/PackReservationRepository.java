package com.project.festival.Entity.TravalPack.Repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.TravalPack.PackReservation;

@Repository
public interface PackReservationRepository extends CrudRepository<PackReservation, Long> {
	
	// 페이지별 회원 아이디로 날짜기준 내림차순으로 페키지 예약 정보 가져오기
	Page<PackReservation> findAllByMemId(Pageable pageable, String memId);

	// 페이지별 특정 날짜 사이의 페키지 예약 정보 가져오기
	Page<PackReservation> findAllByMemIdAndStartDateBetween(
		Pageable pageable,
		String memId,
		LocalDate startDate,
		LocalDate endDate
	);

	// 회원 예약한 패키지 갯수 가져오기
	Long countByMemId(String memId);

	// 특정 날짜 사이의 페키지 예약한 갯수 가져오기
	Long countByMemIdAndStartDateBetween(
		String memId,
		LocalDate startDate,
		LocalDate endDate
	);

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	/* 패키지 예약자 번호 조회 */
	PackReservation findByResNum(Long resNum);

	/* 패키지 예약자 회원 조회 */
	List<PackReservation> findByMemId(String memId);
	
}
