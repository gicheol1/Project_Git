package com.project.festival.Entity.Repo;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.Token;

@Repository
public interface TokenRepo extends CrudRepository<Token, Long> {
    
    boolean existsByJti(String jti);

	// 회원 아이디로 토큰 조회
    Optional<Token> findByUser_MemId(String memId);
    
    // 토큰 번호로 조회
    Optional<Token> findByJti(String jti);
    
    // 토큰 번호로 회원 아이디 조회
    Optional<Token> findUser_MemIdByJti(String jti);
    
    // 토큰 삭제
    void deleteByJti(String jti);
    
    // 특정 토큰 번호로 삭제
    void deleteByTokenNum(Long tokenNum);
    
    // 특정 시간 이전 데이터 삭제
    void deleteAllByExpirationDateBefore(Date date);

}
