package com.project.festival.Entity.TravalPack;

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
public class FileTravalPack {
	
	// 파일 번호
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable=false, updatable=false)
	private Long fileNum;

	// 패키지 번호
	private Long packNum;
	
	// 파일 이름
	@Column(length=25000)
	private String fileName;
	
	// 원본 이름
	private String orgName;
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	public FileTravalPack(Long packNum, String fileName, String orgName) {
		super();
		this.packNum = packNum;
		this.fileName = fileName;
		this.orgName = orgName;
	}

}
