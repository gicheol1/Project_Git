package com.project.festival.Entity.board;

import java.time.LocalDate;

import com.project.festival.Constant.IsPrivated;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDto {
	
	// 계시판 번호
	private Long boardNum;
	
	// 작성자
    private String memId;
	
	// 제목
	private String title;

	// 내용
	private String content;
	
	// 작성일
	private LocalDate date = LocalDate.now();
	
	// 리뷰수, 좋아요수
	private Long review = 0L;
	private Long likeCnt = 0L;
	
	// 비공개 여부(Y, N)
	private IsPrivated privated = IsPrivated.N;

}
