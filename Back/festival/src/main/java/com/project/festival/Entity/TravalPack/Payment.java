package com.project.festival.Entity.TravalPack;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment { /* 결제 테이블(엔티티) */ 
	
	/* 결제 기본키 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long paymentNum;
	
	/* 패키지 여행 예약내역 기본키에 대한 외래키 */
	private Long resNum;
	
	/* 지불한 금액 */
	@Column(nullable = false)
	private int payamount;

	/* 결제한 날짜 */
	@Column(nullable = false)
	private LocalDate paydate = LocalDate.now();
	
	/* 카드 번호 */
	@Column(nullable = false, length = 16)
	private String cardnumber;
	
}
