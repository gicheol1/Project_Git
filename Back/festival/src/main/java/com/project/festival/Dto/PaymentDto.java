package com.project.festival.Dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDto { /* 결제 내역 DTO (Data Transfer Object) */

	// 패키지 여행 예약 번호
	private Long resNum;

	// 지불한 금액
	private int payamount;

	// 결제한 날짜
	private LocalDate paydate = LocalDate.now();

	// 카드 번호
	private String cardnumber;

	static public ArrayList<PaymentDto> createPayment() {
		ArrayList<PaymentDto> PayList = new ArrayList<PaymentDto>();

		Random random = new Random();

		/* -------------------------------------------------------- */
		/* 카드번호 랜덤 생성 */
		// 1부터 9까지의 숫자 중 하나를 선택
		int firstDigit1 = ThreadLocalRandom.current().nextInt(1, 10);
		int firstDigit2 = ThreadLocalRandom.current().nextInt(1, 10);
		int firstDigit3 = ThreadLocalRandom.current().nextInt(1, 10);

		// 나머지는 현재 시간 기반으로 생성
		long currentTime1 = System.currentTimeMillis();
		long currentTime2 = System.currentTimeMillis();
		long currentTime3 = System.currentTimeMillis();

		// 각각 다른 cardNumber를 생성
		long cardNumber1 = currentTime1 % 1_000_000_000_000_000L;
		long cardNumber2 = currentTime2 % 1_000_000_000_000_000L;
		long cardNumber3 = currentTime3 % 1_000_000_000_000_000L;

		// 앞자리에 선택한 숫자를 추가
		cardNumber1 += firstDigit1 * 1_000_000_000_000_000L;
		cardNumber2 += firstDigit2 * 1_000_000_000_000_000L;
		cardNumber3 += firstDigit3 * 1_000_000_000_000_000L;

		/* -------------------------------------------------------- */

		PaymentDto paymentdto1 = new PaymentDto();
		paymentdto1.setResNum(1L);
		paymentdto1.setPayamount(random.nextInt(10000000));
		paymentdto1.setPaydate(LocalDate.now());
		paymentdto1.setCardnumber(String.format("%016d", cardNumber1));

		PayList.add(paymentdto1);

		PaymentDto paymentdto2 = new PaymentDto();
		paymentdto2.setResNum(2L);
		paymentdto2.setPayamount(random.nextInt(10000000));
		paymentdto2.setPaydate(LocalDate.now());
		paymentdto2.setCardnumber(String.format("%016d", cardNumber2));

		PayList.add(paymentdto2);

		PaymentDto paymentdto3 = new PaymentDto();
		paymentdto3.setResNum(3L);
		paymentdto3.setPayamount(random.nextInt(10000000));
		paymentdto3.setPaydate(LocalDate.now());
		paymentdto3.setCardnumber(String.format("%016d", cardNumber3));

		PayList.add(paymentdto3);

		return PayList;
	}

}

/*
 * DTO (Data Transfer Object)
 * 
 * - 데이터를 전달하기 위한 단순한 객체
 * 
 * - MVC 패턴에서는 주로 Client 와 Controller 사이에서 DTO가 사용
 * 
 * - DTO 를 사용하면 Client 에게 원하지 않는 값을 노출하지 않고 원하는 값만 리턴할 수 있다
 *
 * [DTO 와 Domain(테이블, 엔티티) 을 분리하는 이유]
 * 
 * - 관심사의 분리(Separation of Concerns, SoC)
 * 
 * - 데이터 은닉과 보안, 유연성과 확장성, 중복 코드 최소화, 각각의 목적에 맞는 최적화
 * 
 * <참고>
 * 
 * - https://e-una.tistory.com/72#1.%20DTO%C2%A0(Data%20Transfer%20Object)
 * 
 * - ChatGpt
 */
