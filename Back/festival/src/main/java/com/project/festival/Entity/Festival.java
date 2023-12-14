package com.project.festival.Entity;

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
public class Festival {
	
	// 축제 번호
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long fNum;

	// 축제 이름
	private String name;

	// 축제 설명
	@Column(length=2500)
	private String content;

	// 축제 위치
	@Column(nullable=false, length=5000)
	private String location;

	// 시작 기간
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;
	
	// 끝나는 기간
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;
	
	// 태그
	@Column(length=100)
	private String Tag;
	
	@Column(length=100)
	private String Region;

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	public Festival(
		String name, String content, String location,
		String startDate, String endDate, String Tag, String Region
	) {
		super();
		this.name = name;
		this.content = content;
		this.location = location;
		this.startDate = LocalDate.parse(startDate);
		this.endDate = LocalDate.parse(endDate);
		this.Tag = Tag;
		this.Region = Region;
	}
	
}
