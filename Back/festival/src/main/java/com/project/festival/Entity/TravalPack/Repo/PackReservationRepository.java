package com.project.festival.Entity.TravalPack.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.User;
import com.project.festival.Entity.TravalPack.PackReservation;


@Repository
public interface PackReservationRepository extends JpaRepository<PackReservation, Long> {
	
	/* 패키지 예약자 번호 조회 */
	PackReservation findByResNum(Long resNum);

	/* 패키지 예약자 회원 조회 */
	List<PackReservation> findByMemId(String memId);
	
	/* 패키지 여행 예약의 패키지 여행 특정값 가져오기 */
//	List<PackReservation> findByPackNum(Long packNum);
	
	/* 패키지 여행 예약의 회원의 특정값 가져오기  */
//	List<PackReservation> findByMemId(List<User> member);
}
