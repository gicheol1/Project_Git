package com.project.festival.Dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PackReservationDto { /* 패키지 여행 예약 DTO */
	
	private Long resNum;

	// 예약한 회원 아이디
	@NotNull
	private String memId;

	// 패키지 번호
	@NotNull
	private Long packNum;
	
	// 패키지 이름
	private String packName;
	
	// 가격
	private int price;

	// 시작일(여행을 예약한 날짜)
	@NotNull
	private LocalDate startDate = LocalDate.now();

	// 인원수
	@NotNull
	private int count;
	
	// 기간(패키지 여행의 기간)
	@NotNull
	private String dateCnt;

	/* 테스트용 패키지 여행 번호 */
	/* - 기본키가 Long인 다른 테이블을 불러와서 랜덤한값을 지정하는 방법 */
//	private static TravalPack createRandomTravalPack() {
//		TravalPack travalPack = new TravalPack();
//
//		// 랜덤한 Long 값 생성
//		Random random = new Random();
//		long randomPackNum = Math.abs(random.nextLong(20)); // 생성된 패키지 여행의 갯 수 만큼 범위 지정
//
//		travalPack.setPackNum(randomPackNum);
//
//		return travalPack;
//	}

	static public ArrayList<PackReservationDto> createPackReservations() {
		ArrayList<PackReservationDto> PackReservation = new ArrayList<PackReservationDto>();

		Random random = new Random();
		LocalDate start = LocalDate.of(2023, 12, random.nextInt(14) + 1); // test용 기간 입력(시작일) 
		LocalDate end = LocalDate.of(2023, 12, random.nextInt(14) + 15); // test용 기간 입력(종료일)
		
//		User member1 = new User();
//		member1.setMemId("admin");
//		TravalPack travalPack1 = new TravalPack();
//		travalPack1.setPackNum(1L);
		
		PackReservationDto PackReservationDto1 = new PackReservationDto();
		PackReservationDto1.setMemId("admin");
		PackReservationDto1.setPackNum(1L);
//		PackReservationDto1.setPrice((random.nextInt(39)+1)*1000); // 이코드 대신 PackReservationService에 여행가격을 불러오기로 수정 함
		PackReservationDto1.setStartDate(LocalDate.now());
		PackReservationDto1.setDateCnt(start + "~" + end);
		PackReservationDto1.setCount(random.nextInt(30));

		PackReservation.add(PackReservationDto1);

//		User member2 = new User();
//		member2.setMemId("user1");
//		TravalPack travalPack2 = new TravalPack();
//		travalPack2.setPackNum(2L);
		
		PackReservationDto PackReservationDto2 = new PackReservationDto();
		PackReservationDto2.setMemId("user1");
		PackReservationDto2.setPackNum(2L);
//		PackReservationDto2.setPrice((random.nextInt(39)+1)*1000);
		PackReservationDto2.setStartDate(LocalDate.now());
		PackReservationDto2.setDateCnt(start + "~" + end);
		PackReservationDto2.setCount(random.nextInt(30));

		PackReservation.add(PackReservationDto2);

//		User member3 = new User();
//		member3.setMemId("user2");
//		TravalPack travalPack3 = new TravalPack();
//		travalPack3.setPackNum(3L);
		
		PackReservationDto PackReservationDto3 = new PackReservationDto();
		PackReservationDto3.setMemId("user2");
		PackReservationDto3.setPackNum(3L);
//		PackReservationDto3.setPrice((random.nextInt(39)+1)*1000);
		PackReservationDto3.setStartDate(LocalDate.now());
		PackReservationDto3.setDateCnt(start + "~" + end);
		PackReservationDto3.setCount(random.nextInt(30));
		
		PackReservation.add(PackReservationDto3);
		return PackReservation;
	}

}
