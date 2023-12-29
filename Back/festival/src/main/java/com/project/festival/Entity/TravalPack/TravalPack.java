package com.project.festival.Entity.TravalPack;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.project.festival.Constant.Reservation;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class TravalPack { // <여행 패키지>

	// 패키지 번호
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long packNum;

	// 패키지 이름
	@Column(nullable = false)
	private String name;

	// 가격
	private int price;

	// 시작기간, 끝나는 기간
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate, endDate;

	// 등록일
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate singupDate = LocalDate.now();

	// 최대 인원수
	private int count;

	// 흡연실, 금연실
	private String smoke;
	
	// 주소, 내용, 축제이름
	private String address, text, festivalname;

	// ~인실
	private int person;

	// 예약 확인
	@Enumerated(EnumType.STRING)
	private Reservation reservation;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="packNum")
	private Collection<FileTravalPack> files;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 패키지 예약자 일대다 일방향 연결
	@OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="packNum")
	private List<PackReservation> packReservation;
}
