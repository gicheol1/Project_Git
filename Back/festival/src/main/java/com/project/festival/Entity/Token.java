package com.project.festival.Entity;

import java.util.Date;

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
public class Token {

	// 토큰 번호
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tokenNum;
    
    // 전용 식별자
    private String jti;
    
    // 회원 아이디
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memId", referencedColumnName = "memId")
    private User user;
    
    // 회원 권한
    @Column(nullable = false)
    private String role;
    
    // 토큰 만료 시간
    @Column(nullable = false)
    private Date expirationDate;
}