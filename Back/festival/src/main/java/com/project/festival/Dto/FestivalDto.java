package com.project.festival.Dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FestivalDto {
	
	// 축제 번호
	private Long fNum;

	// 축제 이름
	private String name;

	// 축제 설명
	private String content;

	// 축제 위치
	private String location;

	// 시작 기간
	private LocalDate startDate;
	
	// 끝나는 기간
	private LocalDate endDate;
	
	// 등록한 기간
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate singDate;

	// 공식 사이트
	private String officialWebsite;
	
	// 태그
	private String tag;
	
	private String region;

}
