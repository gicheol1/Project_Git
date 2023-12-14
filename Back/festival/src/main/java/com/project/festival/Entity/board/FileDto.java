package com.project.festival.Entity.board;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDto {
	
	// FireBase에서 생성한 원본 파일을 Base64로 인코딩
	private String imgFile;
	
	// 파일 이름
	private String fileName;
	
	// 원본 이름
	private String orgName;
	
}
