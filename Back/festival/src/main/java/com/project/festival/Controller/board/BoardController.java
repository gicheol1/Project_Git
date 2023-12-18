package com.project.festival.Controller.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Controller.orther.ConversionBoard;
import com.project.festival.Entity.board.BoardDto;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.UserService;
import com.project.festival.Service.board.BoardService;

import io.jsonwebtoken.Claims;

@RestController
public class BoardController {
	
	// 게시판
    @Autowired
    private BoardService borderService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserService userService;
    
    // json으로 변환하기 위한 컨버젼 메소드 모음
    @Autowired
    private ConversionBoard boardConversion;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 페이지 별 게시판 가져오기
	@GetMapping("/boardPage")
	public ResponseEntity<?> getBoarderList(
		@RequestParam String target,
		@RequestParam int page
	){
		
		Pageable pageable = PageRequest.of(page, 10, Sort.by("boardNum").descending());
		
		List<?> boardList = null;
		
	    switch(target) {
			case "free":
				boardList = boardConversion.returnFree(borderService.getFreeByPage(pageable));
				break;
				
			case "notic":
				boardList = boardConversion.returnNotic(borderService.getNoticByPage(pageable));
				break;
				
			case "promotion":
				boardList = boardConversion.returnPromotion(borderService.getPromotionByPage(pageable));
				break;
				
			case "event":
				boardList = boardConversion.returnEvent(borderService.getEventByPage(pageable));
				break;
				
			case "qa":
				boardList = boardConversion.returnQA(borderService.getQAByPage(pageable));
				break;
			
			default:
				return ResponseEntity.notFound().build();
	    }
	    
	    if(boardList.isEmpty()) {
	    	return ResponseEntity.notFound().build();
	    }
		
		return ResponseEntity.ok(boardList);
	}
	
	// 게시판 총 갯수
	@GetMapping("/boardCnt")
	public ResponseEntity<?> getBoarderCnt(
		@RequestParam String target
	){
		
		long cnt=0;
		
	    switch(target) {
			case "free": cnt = borderService.getFreeCnt(); break;
				
			case "notic": cnt = borderService.getNoticCnt(); break;
				
			case "promotion": cnt = borderService.getPromotionCnt(); break;
				
			case "event": cnt = borderService.getEventCnt(); break;
				
			case "qa": cnt = borderService.getQACnt(); break;
				
			default:
				return ResponseEntity.notFound().build();
	    }
	    
	    return ResponseEntity.ok(cnt);
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판 번호로 상세 정보 가져오기
	@GetMapping("/getDetail")
	public ResponseEntity<?> getBoardDetail(
		@RequestParam String target,
		@RequestParam Long boardNum
	){
		
	    switch(target) {
			case "free":
				return ResponseEntity.ok(borderService.getFreeDetail(boardNum));
				
			case "notic":
				return ResponseEntity.ok(borderService.getNoticDetail(boardNum));
				
			case "promotion":
				return ResponseEntity.ok(borderService.getPromotionDetail(boardNum));
				
			case "event":
				return ResponseEntity.ok(borderService.getEventDetail(boardNum));
				
			case "qa":
				return ResponseEntity.ok(borderService.getQADetail(boardNum));
				
			default:
				return ResponseEntity.notFound().build();
	    }
	}
	
	// 게시판 좋아요 추가
	@GetMapping("/boardLike")
	public void boardLike(
		@RequestParam String target,
		@RequestParam Long boardNum
	){
		
	    switch(target) {
			case "free":
				borderService.addFreeLike(boardNum); return;
				
			case "notic":
				borderService.addNoticLike(boardNum); return;
				
			case "promotion":
				borderService.addPromotionLike(boardNum); return;
				
			case "event":
				borderService.addEventLike(boardNum); return;
				
			case "qa":
				borderService.addQALike(boardNum); return;
				
			default:
				return;
	    }
	}
	
	// 게시판 좋아요 취소
	@GetMapping("/cancelBoardLike")
	public void cancelBoardLike(
		@RequestParam String target,
		@RequestParam Long boardNum
	){
		
	    switch(target) {
			case "free":
				borderService.addFreeLike(boardNum); return;
				
			case "notic":
				borderService.addNoticLike(boardNum); return;
				
			case "promotion":
				borderService.addPromotionLike(boardNum); return;
				
			case "event":
				borderService.addEventLike(boardNum); return;
				
			case "qa":
				borderService.addQALike(boardNum); return;
				
			default:
				return;
	    }
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판 저장, 수정
	@PostMapping("/setDetail")
	public ResponseEntity<?> setBoardDetail(
		@RequestParam String target,
		@RequestParam String jwt,
		@RequestParam Long boardNum,
		@RequestBody BoardDto boardDetail
	){
		
		Claims claims;
		
		try {
			claims = jwtService.getAuthUser(jwt);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		// 토큰 만료시
		if(claims.isEmpty() && !jwtService.isExistsByJti(claims.get("jti", String.class))) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		String memId = claims.get("memId", String.class);
		
		// 비회원인 경우
		if(userService.findUser(memId).isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		// 작성자 지정
		boardDetail.setMemId(memId);
		
		// 게시판 번호가 존재하면 수정, 없으면 새로 작성되는 게시글
		if(boardNum!=null && boardNum!=0) {
			boardDetail.setBoardNum(boardNum);
		}
		
	    switch(target) {
			case "free":
				return ResponseEntity.ok(borderService.setFreeDetail(boardDetail));
				
			case "notic":
				return ResponseEntity.ok(borderService.setNoticDetail(boardDetail));
				
			case "promotion":
				return ResponseEntity.ok(borderService.setPromotionDetail(boardDetail));
				
			case "event":
				return ResponseEntity.ok(borderService.setEventDetail(boardDetail));
				
			case "qa":
				return ResponseEntity.ok(borderService.setQADetail(boardDetail));
				
			default:
				return ResponseEntity.notFound().build();
	    }
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판 삭제하기
	@DeleteMapping("/deleteBoard")
	public ResponseEntity<?> deleteBoard(
		@RequestParam String target,
		@RequestParam Long boardNum
	){
		
	    switch(target) {
			case "free": borderService.deleteFree(boardNum); break;
				
			case "notic": borderService.deleteNotic(boardNum); break;
				
			case "promotion": borderService.deletePromotion(boardNum); break;
				
			case "event": borderService.deleteEvent(boardNum); break;
				
			case "qa": borderService.deleteQA(boardNum); break;
				
			default:
				return ResponseEntity.notFound().build();
	    }
		return ResponseEntity.ok().build();
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판 소유주 확인
	@GetMapping("/isOwner")
	public ResponseEntity<?> isOwnerBoard(
		@RequestParam String target,
		@RequestParam Long boardNum,
		@RequestParam String jwt
	){
		
		if(jwt == null) {
			return ResponseEntity.ok(false);
		}
		
		Claims claims;
		
		try { claims = jwtService.getAuthUser(jwt); }
		catch(Exception e) { return ResponseEntity.ok(false); }
		
		// 토큰 만료시
		if(claims.isEmpty() && !jwtService.isExistsByJti(claims.get("jti", String.class))) {
			return ResponseEntity.ok(false);
		}
		
		String memId = claims.get("memId", String.class);
		
		// 비회원인 경우
		if(userService.findUser(memId).isEmpty()) { return ResponseEntity.ok(false); }
		
		boolean isOwner = false;
		
		switch(target) {
			case "free": isOwner = borderService.isOwnerFree(boardNum, memId); break;
				
			case "notic": isOwner = borderService.isOwnerNotic(boardNum, memId); break;
				
			case "promotion": isOwner = borderService.isOwnerPromotion(boardNum, memId); break;
				
			case "event": isOwner = borderService.isOwnerEvent(boardNum, memId); break;
				
			case "qa": isOwner = borderService.isOwnerQA(boardNum, memId); break;
			
			default: return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(isOwner);
		
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
}
