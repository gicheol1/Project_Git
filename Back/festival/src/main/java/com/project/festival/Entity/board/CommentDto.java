package com.project.festival.Entity.board;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
	
	// 댓글 번호
	@NotNull
	private Long coNum;
	
	// 답글 대상 번호
	private Long recoNum;
	
	// 작성자
	@NotNull
	private String memId;
	
	// 답글 대상 작성자
	private String recoMemId;
	
	// 게시판 번호
	@NotNull
	private Long boardNum;
	
	// 작성 일자
	@NotNull
    private LocalDate date;
    
    // 댓글 내용
	@NotNull
	private String content;
	
	// 삭제 여부
	@NotNull
	private boolean isDeleted;
}