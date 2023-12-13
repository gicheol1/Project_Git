package com.project.festival.Controller.Traval;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Dto.PaymentDto;
import com.project.festival.Dto.PaymentStatus;
import com.project.festival.Entity.TravalPack.Payment;
import com.project.festival.Service.TravalPack.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController { /* 사용자 요청 처리(결제) */

	private final PaymentService paymentService;

	/* 결제 내역 전체 조회 */
	@GetMapping
	private Iterable<Payment> getPaymemt() {
		return paymentService.findAll();
	}

	/* 결제 하기 */
	@PostMapping
	public ResponseEntity<PaymentStatus> addPayment(@RequestBody PaymentDto paymentDto) {
		PaymentStatus paystatus = paymentService.addPayment(paymentDto);
		return ResponseEntity.ok(paystatus);
	}
}
