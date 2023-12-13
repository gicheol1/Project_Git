package com.project.festival.Entity;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BlackList {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blackId;
    
    // 회원 아이디
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memId", referencedColumnName = "memId")
    private User user;

	// 차단 일자
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(nullable=true)
	private LocalDate banDate;

	// 차단 사유
	@Column(nullable=false, length=2500)
	private String reason;
}
