package com.project.festival.Entity;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.format.annotation.DateTimeFormat;

import com.project.festival.Constant.Role;
import com.project.festival.Entity.TravalPack.PackReservation;
import com.project.festival.Entity.board.Comm.CommentEvent;
import com.project.festival.Entity.board.Comm.CommentFree;
import com.project.festival.Entity.board.Comm.CommentNotic;
import com.project.festival.Entity.board.Comm.CommentPromotion;
import com.project.festival.Entity.board.Comm.CommentQA;
import com.project.festival.Entity.board.Entity.BoardEvent;
import com.project.festival.Entity.board.Entity.BoardFree;
import com.project.festival.Entity.board.Entity.BoardNotic;
import com.project.festival.Entity.board.Entity.BoardPromotion;
import com.project.festival.Entity.board.Entity.BoardQA;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="`user`")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

	// 아이디(기본키)
	@Id
	@Column(nullable=false, updatable=false)
	private String memId;

	// 비밀번호
	@Column(nullable=false)
	private String pw;

	// 이름
	@Column(nullable=false)
	private String name;

	// 전화번호
	@Column(nullable=false, length=30)
	private String phonNum;

	// 생년월일
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(nullable=false, updatable=false)
	private LocalDate birth;

	// 이메일
	@Column(nullable=false)
	private String email;
	
// ---------- ---------- ---------- ---------- ----------

	// 주소(도로명)
	@Column(nullable=false, length=2500)
	private String addrRoad;

	// 주소(지번)
	@Column(nullable=false, length=2500)
	private String addrJibun;

	// 주소(우편번호)
	@Column(nullable=false)
	private String addrCode;

	// 주소(상세 주소)
	@Column
	private String addrOther;
	
// ---------- ---------- ---------- ---------- ----------

	// 가입일
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(updatable=false)
	private LocalDate singupDate = LocalDate.now();

	// 권한
	@Enumerated(EnumType.STRING)
	private Role role = Role.USER;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 계시판 일대다 일방향 연결
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<BoardFree> borderFree;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<BoardNotic> borderNotic;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<BoardEvent> borderEvent;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<BoardPromotion> borderPromotion;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<BoardQA> borderQA;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 댓글 작성자 일대다 일방향 연결
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<CommentFree> commFree;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<CommentNotic> commNotic;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<CommentEvent> commEvent;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<CommentPromotion> commPromotion;
    
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<CommentQA> commQA;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
	// 패키지 여행 예약 일대다 일방향 연결
    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="memId")
    private Collection<PackReservation> packReservation;

 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


	// 테스트용 기본 생성(권한 또한 직접 설정)
	public User(
		String memId, String pw, String name,
		String phonNum, String birth, String email,
		String addrRoad, String addrJibun, String addrCode,
		String singupDate, Role role
	) {
		this.memId = memId;
		this.pw = pw;
		this.name = name;
		this.phonNum = phonNum;
		this.birth = LocalDate.parse(birth);
		this.email = email;
		this.addrRoad = addrRoad;
		this.addrJibun = addrJibun;
		this.addrCode = addrCode;
		this.singupDate = LocalDate.parse(singupDate);
		this.role = role;
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 삼항 연산자를 활용한 회원 정보 변경
//	public void changeUser(User beforUser) {
//		
//		// newUser에 해당 데이터가 null이면 기존 데이터로 설정
//		this.memId = memId==null ?
//			beforUser.getMemId() :
//			this.memId;
//		
//		this.pw = pw==null ? 
//			beforUser.getPw() : 
//			this.pw;
//		
//		this.name = name==null ? 
//			beforUser.getName() : 
//			this.name;
//		
//		this.phonNum = phonNum==null ? 
//			beforUser.getPhonNum() : 
//			this.phonNum;
//		
//		this.birth = LocalDate.parse(
//			birth==null ? 
//				beforUser.getBirth().toString() : 
//				this.birth.toString());
//		
//		this.email = email==null ? 
//			beforUser.getEmail() : 
//			this.email;
//
//		this.addrRoad = addrRoad==null ? 
//			beforUser.getAddrRoad() : 
//			addrRoad;
//		
//		this.addrJibun = addrJibun==null ? 
//			beforUser.getAddrJibun() : 
//			addrJibun;
//		
//		this.addrCode = addrCode==null ? 
//			beforUser.getAddrCode() : 
//			addrCode;
//		
//		this.singupDate = LocalDate.parse(
//			singupDate==null ? 
//				beforUser.getSingupDate().toString() : 
//				this.singupDate.toString());
//		
//		this.role = role==null ? 
//			beforUser.getRole() : 
//			this.role;
//	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 기본 권한 부여
//	public void singUpBasic() {
//		this.role = "USER";
//	}
}
