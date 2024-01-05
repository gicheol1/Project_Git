package com.project.festival.Dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;

import com.project.festival.Constant.Reservation;
import com.project.festival.Entity.festival.FileFestival;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TravalPackDto {

	// 패키지 번호
	private Long packNum;

	// 패키지 이름, 흡연실(금연실), 주소, 내용
	@NotNull
	private String name, smoke, address, text;
	
	private String festivalname;

	// 가격, 최대 인원수
	@NotBlank
	private int price, count, person;

	// 시작기간, 끝나는 기간, 등록일
	@NotBlank
	private LocalDate startDate, endDate;
	
	@NotBlank
	private LocalDate singupDate = LocalDate.now();

	// 예약여부
	@NotBlank
	private Reservation reservation;

	/* TravalPackDto에서 사용할 랜덤도로명 주소 */ 
    private static final String[] roadAddresses = {
            "대전광역시 서구 배재로 155-40", "대전광역시 서구 배재로 102", "대전광역시 서구 배재로 103",
            "대전광역시 서구 배재로 117 (복음로얄아파트)", "대전광역시 서구 배재로 118", "대전광역시 서구 배재로 118-1",
            "대전광역시 서구 배재로 120", "대전광역시 서구 배재로 122", "대전광역시 서구 배재로 123",
            "대전광역시 서구 배재로 166", "대전광역시 서구 배재로 168", "대전광역시 서구 배재로 170",
            "서울특별시 강북구 삼양로177길", "서울특별시 강북구 삼양로181길", "서울특별시 강북구 삼양로", "서울특별시 강북구 삼양로170길",
            "서울특별시 강북구 도선사길 236", "서울특별시 강북구 오현로 65", "서울특별시 강북구 한천로140길 58", "서울특별시 강북구 노해로 29",
            "서울특별시 강북구 도봉로 114", "서울특별시 강북구 도봉로 253", "서울특별시 강북구 도봉로 374", "서울특별시 강북구 삼각산로 43",
            "서울특별시 강북구 삼각산로20길", "서울특별시 강북구 삼양로 689", "서울특별시 강북구 삼양로19길 47", "서울특별시 강북구 삼양로19길 141",
            "전라북도 전주시 완산구 전라감영로 55", "전라북도 전주시 완산구 전라감영로 75", "전라북도 전주시 완산구 전라감영1길 1", "전라북도 전주시 완산구 전라감영1길 2",
//            "전라북도 전주시 완산구 전라감영1길 3-2", "전라북도 전주시 완산구 전라감영1길 3-4", "전라북도 전주시 완산구 전라감영1길 3-6", "전라북도 전주시 완산구 전라감영1길 4",
//            "전라북도 전주시 완산구 전라감영1길 5", "전라북도 전주시 완산구 전라감영1길 6", "전라북도 전주시 완산구 전라감영1길 7", "전라북도 전주시 완산구 전라감영1길 7-1",
//            "전라북도 전주시 완산구 전라감영1길 7-4", "전라북도 전주시 완산구 전라감영1길 7-7", "전라북도 전주시 완산구 전라감영1길 9", "전라북도 전주시 완산구 전라감영1길 10",
    };
    
    // - 랜덤한 주소 선택
    private static String getRandomRoadAddress() {
        int randomIndex = (int) (Math.random() * roadAddresses.length);
        return roadAddresses[randomIndex];
    }
    
    /* TravalPackDto에서 사용할 랜덤축제명 */ 
    private static final String[] festivalnames = {
    		"성북 책모꼬지","제44회 서울무용제","서울거리공연 구석구석 라이브","한국의집 고호재","성북청춘불패영화제","예술고시촌 로컬페스티벌","2023 문화가 흐르는 예술마당","K-핸드메이드페어 2024",
    		"대한민국 우리술 대축제","ㅊㅊ-하다 페스티벌","경상북도사과홍보행사","2023년 유니버설디자인 공감주간","제 15회 언리미티드 에디션 서울아트북페어 2023",
    		"제3회 금천패션영화제","2023 광화문 책마당","한강불빛공연 드론 라이트쇼","양재 아트 살롱","월드판소리페스티벌",
    		"무브살롱 시즌2 펫토피아","중구 도심산업 페스타","서울디자인 2023","양재플라워페스타","유림공원","2023 대전빵축제",
    		"대전동구 문화재야행","K-Hyo 페스타","서구힐링 아트페스티벌","대구 음식산업 박람회","E world 일루미네이션",
    		"PumpKin Festa","Dance ChampionShip","대구 인터네이션 오페라 페스티벌","통영수산식품대전","2023 International Ki Sports Festival","2023 글로벌 영도커피페스티벌"
    		
    };
    
    // - 랜덤한 축제 선택
    private static String getRandomfestivalnames() {
    	int randomIndex = (int) (Math.random() * festivalnames.length);
    	return festivalnames[randomIndex];
    }

	static public ArrayList<TravalPackDto> createTravalPack() {
		ArrayList<TravalPackDto> TravalPackList = new ArrayList<TravalPackDto>();

		Random random = new Random();
				
		
		TravalPackDto TravalPack1 = new TravalPackDto();

		// 시작일에서 2일을 더한 후 종료일로 설정
		TravalPack1.setName("패키지 여행 숙소 테스트1");
		TravalPack1.setPrice(random.nextInt(10000));
//		TravalPack1.setStartDate(LocalDate.of(2023, random.nextInt(6) + 1, random.nextInt(14) + 1)); // 1 ~ 15까지 랜덤 일
//		TravalPack1.setEndDate(LocalDate.of(2023, random.nextInt(6) + 6, random.nextInt(14) + 15)); // 15 ~ 28까지 랜덤 일
		
		TravalPack1.setStartDate(LocalDate.of(2023, 11, random.nextInt(29) + 1)); // 1 ~ 30까지 랜덤 일
		LocalDate startDate1 = TravalPack1.getStartDate(); // 시작일 가져오기
		LocalDate endDate1 = startDate1.plusDays(1); // 시작일로부터 1일 후를 종료일로 설정
		TravalPack1.setEndDate(endDate1); // 종료일 설정
		
		TravalPack1.setSingupDate(LocalDate.now());
		TravalPack1.setCount(30);
		TravalPack1.setSmoke("흡연실");
		TravalPack1.setPerson(10);
		TravalPack1.setReservation(Reservation.YES);
		TravalPack1.setAddress(getRandomRoadAddress());
		TravalPack1.setText("상새내용1");
		TravalPack1.setFestivalname(getRandomfestivalnames());

		TravalPackList.add(TravalPack1);

		TravalPackDto TravalPack2 = new TravalPackDto();
		TravalPack2.setName("패키지 여행 숙소 테스트2");
		TravalPack2.setPrice(random.nextInt(20000));
		TravalPack2.setStartDate(LocalDate.of(2023, 12, random.nextInt(29) + 1)); // 1 ~ 30까지 랜덤 일
		LocalDate startDate2 = TravalPack2.getStartDate(); // 시작일 가져오기
		LocalDate endDate2 = startDate2.plusDays(2); // 시작일로부터 2일 후를 종료일로 설정
		TravalPack2.setEndDate(endDate2); // 종료일 설정
		TravalPack2.setSingupDate(LocalDate.now());
		TravalPack2.setCount(20);
		TravalPack2.setSmoke("금연실");
		TravalPack2.setPerson(20);
		TravalPack2.setReservation(Reservation.NO);
		TravalPack2.setAddress(getRandomRoadAddress());
		TravalPack2.setText("상새내용2");
		TravalPack2.setFestivalname(getRandomfestivalnames());

		TravalPackList.add(TravalPack2);

		// 패키지 여행 숙소(1박 2일) 목록 1
		for (int i = 3; i <= 10; i++) {
			TravalPackDto TravalPack3 = new TravalPackDto();
			TravalPack3.setName("패키지 여행 숙소 테스트" + i);
			TravalPack3.setPrice(random.nextInt(10000));						
			TravalPack3.setStartDate(LocalDate.of(2023, 11, random.nextInt(29) + 1)); // 1 ~ 30까지 랜덤 일
			LocalDate startDate3 = TravalPack3.getStartDate(); // 시작일 가져오기
			LocalDate endDate3 = startDate3.plusDays(1); // 시작일로부터 1일 후를 종료일로 설정
			TravalPack3.setEndDate(endDate3); // 종료일 설정
			TravalPack3.setSingupDate(LocalDate.now());
			TravalPack3.setCount(20 + i);
			TravalPack3.setSmoke("흡연실");
			TravalPack3.setPerson(3 + i);
			TravalPack3.setReservation(Reservation.YES);
			TravalPack3.setAddress(getRandomRoadAddress());
			TravalPack3.setText("상새내용" + i);
			TravalPack3.setFestivalname(getRandomfestivalnames());
			
			TravalPackList.add(TravalPack3);
		}

		// 패키지 여행 숙소(2박 3일) 목록 2
		for (int i = 11; i <= 15; i++) {
			TravalPackDto TravalPack4 = new TravalPackDto();
			TravalPack4.setName("패키지 여행 숙소 테스트" + i);
			TravalPack4.setPrice(random.nextInt(20000));
			TravalPack4.setStartDate(LocalDate.of(2023, 12, random.nextInt(29) + 1)); // 1 ~ 30까지 랜덤 일
			LocalDate startDate4 = TravalPack4.getStartDate(); // 시작일 가져오기
			LocalDate endDate4 = startDate4.plusDays(2); // 시작일로부터 2일 후를 종료일로 설정
			TravalPack4.setEndDate(endDate4); // 종료일 설정
			TravalPack4.setSingupDate(LocalDate.now());
			TravalPack4.setCount(20 + i);
			TravalPack4.setSmoke("금연실");
			TravalPack4.setPerson(11 + i);
			TravalPack4.setReservation(Reservation.NO);
			TravalPack4.setAddress(getRandomRoadAddress());
			TravalPack4.setText("상새내용" + i);
			TravalPack4.setFestivalname(getRandomfestivalnames());
			
			TravalPackList.add(TravalPack4);
		}

		// 패키지 여행 숙소(당일) 목록 3
//		for (int i = 21; i <= 26; i++) {
//			TravalPackDto TravalPack5 = new TravalPackDto();
//			TravalPack5.setName("패키지 여행 숙소 테스트" + i);
//			TravalPack5.setPrice(random.nextInt(20000));
//			TravalPack5.setStartDate(LocalDate.of(2024, 1, random.nextInt(29) + 1)); // 1 ~ 30까지 랜덤 일
//			LocalDate startDate5 = TravalPack5.getStartDate(); // 시작일 가져오기
//			LocalDate endDate5 = startDate5.plusDays(0); // 시작일로부터 2일 후를 종료일로 설정
//			TravalPack5.setEndDate(endDate5); // 종료일 설정
//			TravalPack5.setSingupDate(LocalDate.now());
//			TravalPack5.setCount(20 + i);
//			TravalPack5.setSmoke("금연실");
//			TravalPack5.setPerson(11 + i);
//			TravalPack5.setReservation(Reservation.NO);
//			TravalPack5.setAddress(getRandomRoadAddress());
//			TravalPack5.setText("상새내용" + i);
//			TravalPack5.setFestivalname(getRandomfestivalnames());
//			
//			TravalPackList.add(TravalPack5);
//		}

		return TravalPackList;
	}
}
