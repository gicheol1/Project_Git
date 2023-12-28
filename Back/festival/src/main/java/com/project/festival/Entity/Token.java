package com.project.festival.Entity;

import java.util.Date;

import com.project.festival.Constant.Role;

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
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Token {

	// 토큰 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenNum;
    
    // 전용 식별자
    private String jti;
    
    // 회원 아이디
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "memId", referencedColumnName = "memId")
    private User user;

	// 권한
	@Enumerated(EnumType.STRING)
	private Role role = Role.USER;
    
    // 토큰 만료 시간
    @Column(nullable = false)
    private Date expirationDate;
}