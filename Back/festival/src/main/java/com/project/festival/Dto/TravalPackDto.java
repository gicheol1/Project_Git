package com.project.festival.Dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;

import com.project.festival.Constant.Reservation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TravalPackDto {

	// 패키지 이름, 흡연실(금연실), 주소, 내용
	@NotNull
	private String name, smoke, address, text;

	// 가격, 최대 인원수
	@NotBlank
	private int price, count, person;

	// 시작기간, 끝나는 기간, 등록일
	@NotBlank
	private LocalDate startDate, endDate, singupDate;

	// 예약여부
	@NotBlank
	private Reservation reservation;

	/* TravalPackDto에서 사용할 랜덤도로명 주소 */ 
    private static final String[] roadAddresses = {
            "대전광역시 서구 배재로 155-40", "대전광역시 서구 배재로 102", "대전광역시 서구 배재로 103",
            "대전광역시 서구 배재로 104", "대전광역시 서구 배재로 106", "대전광역시 서구 배재로 107-1",
            "대전광역시 서구 배재로 107-7", "대전광역시 서구 배재로 107-9", "대전광역시 서구 배재로 107-11",
            "대전광역시 서구 배재로 107-16", "대전광역시 서구 배재로 107-30 (양지타운)", "대전광역시 서구 배재로 107-33",
            "대전광역시 서구 배재로 107-37", "대전광역시 서구 배재로 108", "대전광역시 서구 배재로 116",
            "대전광역시 서구 배재로 117 (복음로얄아파트)", "대전광역시 서구 배재로 118", "대전광역시 서구 배재로 118-1",
            "대전광역시 서구 배재로 120", "대전광역시 서구 배재로 122", "대전광역시 서구 배재로 123",
            "대전광역시 서구 배재로 124", "대전광역시 서구 배재로 126", "대전광역시 서구 배재로 126-1",
            "대전광역시 서구 배재로 128", "대전광역시 서구 배재로 134 (경남아파트1단지)", "대전광역시 서구 배재로 139-31 (경남아파트2단지)",
            "대전광역시 서구 배재로 139-43", "대전광역시 서구 배재로 139-53", "대전광역시 서구 배재로 139-57",
            "대전광역시 서구 배재로 139-65 (경남아파트2단지)", "대전광역시 서구 배재로 155-7 (경남아파트2단지)", "대전광역시 서구 배재로 152",
            "대전광역시 서구 배재로 155-26 (경남아파트2단지)", "대전광역시 서구 배재로 156", "대전광역시 서구 배재로 160",
            "대전광역시 서구 배재로 162", "대전광역시 서구 배재로 162-1", "대전광역시 서구 배재로 164",
            "대전광역시 서구 배재로 166", "대전광역시 서구 배재로 168", "대전광역시 서구 배재로 170",
            "대전광역시 서구 배재로 173-8", "대전광역시 서구 배재로 174", "대전광역시 서구 배재로 175",
            "대전광역시 서구 배재로 176", "대전광역시 서구 배재로 177", "대전광역시 서구 배재로 178",
            "대전광역시 서구 배재로 180", "대전광역시 서구 배재로 181",             
    };
    
    // - 랜덤한 주소 선택
    private static String getRandomRoadAddress() {
        int randomIndex = (int) (Math.random() * roadAddresses.length);
        return roadAddresses[randomIndex];
    }

	static public ArrayList<TravalPackDto> createTravalPack() {
		ArrayList<TravalPackDto> TravalPackList = new ArrayList<TravalPackDto>();

		Random random = new Random();
				
		TravalPackDto TravalPack1 = new TravalPackDto();
		TravalPack1.setName("여행 패키지 테스트1");
		TravalPack1.setPrice(random.nextInt(10000000));
		TravalPack1.setStartDate(LocalDate.of(2023, random.nextInt(6) + 1, random.nextInt(14) + 1)); // 1 ~ 15까지 랜덤 일
		TravalPack1.setEndDate(LocalDate.of(2023, random.nextInt(6) + 6, random.nextInt(14) + 15)); // 15 ~ 28까지 랜덤 일
		TravalPack1.setSingupDate(LocalDate.now());
		TravalPack1.setCount(30);
		TravalPack1.setSmoke("흡연실");
		TravalPack1.setPerson(10);
		TravalPack1.setReservation(Reservation.YES);
		TravalPack1.setAddress(getRandomRoadAddress());
		TravalPack1.setText("상새내용1");

		TravalPackList.add(TravalPack1);

		TravalPackDto TravalPack2 = new TravalPackDto();
		TravalPack2.setName("여행 패키지 테스트2");
		TravalPack2.setPrice(random.nextInt(10000000));
		TravalPack2.setStartDate(LocalDate.of(2023, random.nextInt(6) + 1, random.nextInt(14) + 1)); // 1 ~ 15까지 랜덤 일
		TravalPack2.setEndDate(LocalDate.of(2023, random.nextInt(6) + 6, random.nextInt(14) + 15)); // 15 ~ 28까지 랜덤 일
		TravalPack2.setSingupDate(LocalDate.now());
		TravalPack2.setCount(20);
		TravalPack2.setSmoke("금연실");
		TravalPack2.setPerson(20);
		TravalPack2.setReservation(Reservation.NO);
		TravalPack2.setAddress(getRandomRoadAddress());
		TravalPack2.setText("상새내용2");

		TravalPackList.add(TravalPack2);

		// 여행 패키지 목록1
		for (int i = 3; i <= 10; i++) {
			TravalPackDto TravalPack3 = new TravalPackDto();
			TravalPack3.setName("여행 패키지 테스트" + i);
			TravalPack3.setPrice(random.nextInt(10000000));
			TravalPack3.setStartDate(LocalDate.of(2023, 11, random.nextInt(14) + 1));
			TravalPack3.setEndDate(LocalDate.of(2023, 11, random.nextInt(14) + 15));
			TravalPack3.setSingupDate(LocalDate.now());
			TravalPack3.setCount(20 + i);
			TravalPack3.setSmoke("흡연실");
			TravalPack3.setPerson(3 + i);
			TravalPack3.setReservation(Reservation.YES);
			TravalPack3.setAddress(getRandomRoadAddress());
			TravalPack3.setText("상새내용" + i);
			
			TravalPackList.add(TravalPack3);
		}

		// 여행 패키지 목록2
		for (int i = 11; i <= 20; i++) {
			TravalPackDto TravalPack4 = new TravalPackDto();
			TravalPack4.setName("여행 패키지 테스트" + i);
			TravalPack4.setPrice(random.nextInt(10000000));
			TravalPack4.setStartDate(LocalDate.of(2023, 12, random.nextInt(14) + 1));
			TravalPack4.setEndDate(LocalDate.of(2023, 12, random.nextInt(14) + 15));
			TravalPack4.setSingupDate(LocalDate.now());
			TravalPack4.setCount(20 + i);
			TravalPack4.setSmoke("금연실");
			TravalPack4.setPerson(11 + i);
			TravalPack4.setReservation(Reservation.NO);
			TravalPack4.setAddress(getRandomRoadAddress());
			TravalPack4.setText("상새내용" + i);
			
			TravalPackList.add(TravalPack4);
		}

		return TravalPackList;
	}
}
