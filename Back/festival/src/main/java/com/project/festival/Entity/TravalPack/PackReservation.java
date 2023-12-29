package com.project.festival.Entity.TravalPack;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PackReservation { // <패키지 예약자>
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long resNum;
	
	// 예약한 회원 아이디 왜래키
    private String memId;
	
	// 패키지 번호 외래키
	private Long packNum;
	
	// 가격
	private int price;

	// 시작일(예약한 날짜)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(nullable=false, updatable=false)
	private LocalDate startDate = LocalDate.now();

	// 인원수
	private int count;
	
	// 기간(여행 기간)
	private String dateCnt;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 결제 내역 일대다 일방향 연결
	@OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="resNum")
	private List<Payment> payment;
}
