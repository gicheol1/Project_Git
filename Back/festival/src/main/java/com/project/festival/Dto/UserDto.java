package com.project.festival.Dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

// 
// ========== 사용자 정보 출력용 객체 ========== 
// 
// - 비밀번호와 권한 비공개
//

@Getter
@Setter
public class UserDto {

	// 아이디(기본키)
	private String memId;

	// 이름
	private String name;

	// 전화번호
	private String phonNum;

	// 생년월일
	private LocalDate birth;

	// 이메일
	private String email;
	
// ---------- ---------- ---------- ---------- ----------

	// 주소(도로명)
	private String addrRoad;

	// 주소(지번)
	private String addrJibun;

	// 주소(우편번호)
	private String addrCode;

	// 주소(상세 주소)
	private String addrOther;
	
// ---------- ---------- ---------- ---------- ----------

	// 가입일
	private LocalDate singupDate;
}
