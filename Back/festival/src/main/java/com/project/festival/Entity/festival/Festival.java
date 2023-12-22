package com.project.festival.Entity.festival;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
	private Long festivalNum;

	// 축제 이름
	private String name;

	// 축제 설명
	@Column(length=2500)
	private String content;

	// 축제 위치(도로명, 지번과 같은 상세 위치)
	@Column(nullable=false, length=5000)
	private String location;

	// 시작 기간
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;
	
	// 끝나는 기간
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;
	
	// 등록한 기간
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate singDate = LocalDate.now();

	// 공식 사이트
	@Column(length=2500)
	private String officialWebsite;
	
	// 태그
	@Column(length=100)
	private String tag;
	
	// 축제 지역(서울, 인천, 대전, ...)
	@Column(length=100)
	private String region;
	
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="festivalNum")
	private Collection<FileFestival> files;
	
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	public Festival(
		String name, String content, String location,
		String startDate, String endDate, String tag, String region
	) {
		super();
		this.name = name;
		this.content = content;
		this.location = location;
		this.startDate = LocalDate.parse(startDate);
		this.endDate = LocalDate.parse(endDate);
		this.tag = tag;
		this.region = region;
	}
	
}
