package com.project.festival.Entity.festival;

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
public class FileFestival {
	
	// 파일 번호
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable=false, updatable=false)
	private Long fileNum;

	// 축제 번호
	private Long festivalNum;
	
	// 파일 이름
	@Column(length=25000)
	private String fileName;
	
	// 원본 이름
	private String orgName;
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	public FileFestival(Long festivalNum, String fileName, String orgName) {
		super();
		this.festivalNum = festivalNum;
		this.fileName = fileName;
		this.orgName = orgName;
	}
}
