package com.project.festival.Dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlackListDto {

	// 블랙리스트 번호
    private Long blackId;
    
    // 차단된 회원 아이디
    private String memId;

	// 차단 일자
	private LocalDate banDate = LocalDate.now();

	// 차단 종료 일자
	private LocalDate banEndDate;

	// 차단 사유
	private String reason;
}
