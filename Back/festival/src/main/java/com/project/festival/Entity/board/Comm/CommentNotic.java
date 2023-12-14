package com.project.festival.Entity.board.Comm;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CommentNotic {
	
	// 댓글 번호
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long coNum;

	// 답글 대상 번호
	private Long recoNum;

	// 작성자
	private String memId;

	// 작성된 계시판 번호
    private Long boardNum;
	
	// 작성일
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(nullable=false, updatable=false)
	private LocalDate date = LocalDate.now();

    // 댓글 내용
	@Column(length = 2500)
	private String content;
	
	// 삭제 여부
	private boolean isDeleted = false;
}
