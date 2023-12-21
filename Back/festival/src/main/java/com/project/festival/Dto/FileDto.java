package com.project.festival.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDto {
	
	// 이미지 원본 파일을 Base64로 인코딩
	private String imgFile;
	
	// 파일 형식
	private String contentType;
	
	// 파일 이름
	private String fileName;
	
	// 원본 이름
	private String orgName;
	
}
