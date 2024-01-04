package com.project.festival.Dto;

import java.time.LocalDate;

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
	
}
