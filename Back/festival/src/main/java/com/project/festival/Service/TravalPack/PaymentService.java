package com.project.festival.Service.TravalPack;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.festival.Dto.PaymentDto;
import com.project.festival.Dto.PaymentStatus;
import com.project.festival.Entity.TravalPack.PackReservation;
import com.project.festival.Entity.TravalPack.Payment;
import com.project.festival.Entity.TravalPack.Repo.PackReservationRepository;
import com.project.festival.Entity.TravalPack.Repo.PaymentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {
	
	private final PaymentRepository paymentRepository; // 결제 쿼리문
	private final PackReservationRepository packReservationRepository; // 패키지 여행 예약 쿼리문
	
	/* 결재 전체 조회 */
	public Iterable<Payment> findAll() {
		return paymentRepository.findAll();
	}
	
	/* 결재 내역 생성 */
/* ------------------------------------------------------------------------------------------- */
	/* PaymentStatus(결제 상태) DTO 클래스 생성 및 사용 */
	@Transactional
	public PaymentStatus addPayment(PaymentDto paymentDto) {
		Payment payment = new Payment(); // 결제 테이블
		
		PackReservation packReservation = packReservationRepository.findByResNum(paymentDto.getResNum()); // 패키지 예약 내역
		payment.setResNum(packReservation.getResNum()); // 예약 내역 정보
		payment.setPayamount(paymentDto.getPayamount()); // DTO에 결제 금액
//		payment.setPaydate(LocalDate.now()); // 현재 시간
		payment.setCardnumber(paymentDto.getCardnumber()); // DTO의 카드번호
		
		paymentRepository.save(payment);
		
		return new PaymentStatus(payment);
	}

/* ------------------------------------------------------------------------------------------- */
	
	@Transactional
	public void creatDefaultPaymemt() {
		List<PaymentDto> paymentDtos = PaymentDto.createPayment();
		for (PaymentDto paymentDto: paymentDtos) {
			addPayment(paymentDto);
		}
	}
	
}
