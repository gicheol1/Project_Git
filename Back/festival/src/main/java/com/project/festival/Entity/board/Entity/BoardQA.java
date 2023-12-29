package com.project.festival.Entity.board.Entity;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.format.annotation.DateTimeFormat;

import com.project.festival.Constant.IsPrivated;
import com.project.festival.Entity.board.Comm.CommentQA;
import com.project.festival.Entity.board.File.FileQA;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="board_qa")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class BoardQA {
	
	// 계시판 번호
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(updatable=false)
	private Long boardNum;
	
	// 작성자
    private String memId;
	
	// 제목
	@Column(length=300)
	private String title;

	// 내용
	@Column(length=5000)
	private String content;
	
	// 작성일(기본값 : 현제날짜)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(nullable=false, updatable=false)
	private LocalDate date = LocalDate.now();
	
	// 리뷰수, 좋아요수(기본값 : 0)
	private Long review = 0L;
	private Long likeCnt = 0L;
	
	// 비공개 여부(Y, N)
    @Enumerated(EnumType.STRING)
	private IsPrivated privated = IsPrivated.N;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="boardNum")
	private Collection<CommentQA> comment;

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="boardNum")
	private Collection<FileQA> files;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    public BoardQA(
		String memId, String title, String content, IsPrivated privated
    ) {
    	super();
    	this.memId = memId;
    	this.title = title;
    	this.content = content;
    	this.privated = privated;
    }
	
}
