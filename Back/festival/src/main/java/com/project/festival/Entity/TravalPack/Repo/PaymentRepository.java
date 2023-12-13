package com.project.festival.Entity.TravalPack.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.TravalPack.Payment;


@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{ /* 결제 테이블(엔티티) 쿼리문 */
	
	/* <조회> */
	// - 패키지 여행 예약내역을 기준으로 결제 테이블을 조회
//	Iterable<Payment> findByPackReservation(Long resNum);
	
	// - 패키지 여행 예약내역을 기준으로 결제 테이블을 조회(쿼리문 IN: 00 또는 000을 조회) 
//	Iterable<Payment> findByPackReservationIn(List<Long> resNum);
	
}
