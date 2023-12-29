package com.project.festival.Entity.TravalPack.Repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.TravalPack.PackReservation;

@Repository
public interface PackReservationRepository extends CrudRepository<PackReservation, Long> {

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
