package com.project.festival.Dto;

import com.project.festival.Entity.TravalPack.Payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
/* <@AllArgsConstructor>
 * - 클래스 내부에 선언된 모든 field마다 하나의 parameter를 가진 생성자를 생성한다.
 * - @NonNull이 붙어있는 field의 경우, 역시나 생성되는 생성자 내부에 해당 parameter에 null check 로직이 생성된다.
 */
public class PaymentStatus { /* 결제 상태 */
	private Payment payment; /* 결제 */ 
//	private PackReservation packReservation; /* 패키지 여행 예약 내역 */
}
