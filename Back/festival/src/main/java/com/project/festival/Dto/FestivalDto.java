package com.project.festival.Dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Random;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FestivalDto {
	
	// 축제 번호
	private Long festivalNum;

	// 축제 이름
	private String name;

	// 축제 설명
	private String content;

	// 축제 위치(도로명, 지번과 같은 상세 위치)
	private String location;

	// 시작 기간
	private LocalDate startDate;
	
	// 끝나는 기간
	private LocalDate endDate;
	
	// 등록한 기간
	private LocalDate singDate = LocalDate.now();

	// 공식 사이트
	private String officialWebsite;
	
	// 태그
	private String tag;

	// 축제 지역(서울, 인천, 대전, ...)
	private String region;
	
	// 축제 테스트용 데이터
	static public ArrayList<FestivalDto> createFestival() {
		ArrayList<FestivalDto> FestivalList = new ArrayList<FestivalDto>();
		
		Random random = new Random();
		
		FestivalDto Festival1 = new FestivalDto();
		Festival1.setName("축제이름");
		Festival1.setContent("test");
		Festival1.setLocation("서울 서초구");
		Festival1.setStartDate(LocalDate.of(2023, random.nextInt(6) + 1, random.nextInt(14) + 1)); // 1 ~ 15까지 랜덤 일
		Festival1.setEndDate(LocalDate.of(2023, random.nextInt(6) + 6, random.nextInt(14) + 15)); // 15 ~ 28까지 랜덤 일
		Festival1.setSingDate(LocalDate.now());
		Festival1.setOfficialWebsite("https://adventure.lotteworld.com/kor/enjoy/festival/view.do");
		Festival1.setTag("공연/행사");
		Festival1.setRegion("서울");
		
		FestivalList.add(Festival1);
		
		return FestivalList;
	}
}
