package com.project.festival.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Entity.Token;
import com.project.festival.Entity.User;
import com.project.festival.Entity.Repo.TokenRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@Component
@RequiredArgsConstructor
public class JwtService {

    private final TokenRepo tokenRepository;
	
	// 토큰 만료 시간: 3시간
    // 3시간 * 60분(1시간) * 60초(1분) * 1000밀리초(1초)
    static final long EXPRIATIONTIME = (3 * 60 * 60 * 1000);
	
	// 서명 키
	static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	// 토큰 생성
	public String getToken(User user) {
    	
		// 기존에 저장된 토큰 정보 가져오기
        Optional<Token> existingTokenOptional = tokenRepository.findByUser_MemId(user.getMemId());
        
        // 이미 존재하는 경우
        if (existingTokenOptional.isPresent()) {
            Token existingToken = existingTokenOptional.get();
            
            // 해당 정보 삭제
            tokenRepository.delete(existingToken);
        }

        // 토큰에 포함하고자 하는 클레임 PayLoad
        Map<String, Object> claims = new HashMap<>();
        claims.put("memId", user.getMemId());
        claims.put("role", user.getRole());
        
        // 랜덤한 전용 식별 코드 생성
        // https://adjh54.tistory.com/142
        String jti = UUID.randomUUID().toString();
        claims.put("jti", jti);
        
        // 토큰 생성
		String token = Jwts.builder()
            .setClaims(claims) // 토큰에 추가할 데이터
            .setSubject(user.getMemId()) // 토큰의 주제
			.setExpiration(new Date(System.currentTimeMillis() + EXPRIATIONTIME)) // 만료 기간
			.signWith(key) // 암호화 할 서명 키
			.compact();
		
		// 토큰 식별자 저장
		saveToken(jti, user);
		
		return token;
	}

    // ----- ----- ----- ----- ----- ----- ----- ----- -----

	// 토큰 저장
    private void saveToken(String jti, User user) {
        Token tokenEntity = new Token();
        tokenEntity.setJti(jti);
        tokenEntity.setUser(user);
        tokenEntity.setRole(user.getRole());
        tokenEntity.setExpirationDate(new Date(System.currentTimeMillis() + EXPRIATIONTIME));
        tokenRepository.save(tokenEntity);
    }

// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    // 식별자로 토큰 조회
    public boolean isExexists(String jti) {
    	return tokenRepository.existsByJti(jti);
    }

// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 토큰에서 사용자 정보 가져오기(Request)
	public Claims getAuthUser(HttpServletRequest request) {
		
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null) {
            // JWT 토큰을 파싱하고 검증
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            Claims body = claims.getBody();

            String bodyJson = body.toString();

            if (bodyJson != null)
                return body;
        }
        return null;
	}

    // 토큰에서 사용자 정보 가져오기(String)
	public Claims getAuthUser(String token) {

        if (token != null) {
            // JWT 토큰을 파싱하고 검증
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            Claims body = claims.getBody();

            String bodyJson = body.toString();

            if (bodyJson != null)
                return body;
        }
        return null;
	}

// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// 식별 번호로 토큰 존재 여부 조회
	public boolean isExistsByJti(String jti) {
        return tokenRepository.existsByJti(jti);
    }
	
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 토큰 삭제
    @Transactional // 데이터 무결성을 위한 트렌잭션 롤백 적용
    public void deleteTokenByJti(String jti) {
        tokenRepository.deleteByJti(jti);
    }

// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
// ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    // @Scheduled = 해당 메서드를 주기적으로 실행
    //		fixedRate = 밀리초(ms) 단위로 실행
    //		fixedDelay = 실행이 끝난 후 다음 실행까지의 밀리초(ms) 단위의 딜레이
    //		initialDelay = 최초 실행시 지연시킬 밀리초(ms) 단위
    
    // 만료된 토큰 삭제
    @Scheduled(fixedRate = 1 * 60 * 1000) // 1분마다 실행
    @Transactional // 데이터 무결성을 위한 트렌잭션 롤백 적용
    public void cleanupExpiredTokens() {
        Date now = new Date();
        tokenRepository.deleteAllByExpirationDateBefore(now);
    }
}
