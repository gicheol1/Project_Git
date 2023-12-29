package com.project.festival.Controller.board;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Entity.board.BoardDto;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.board.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardController {
	
	// 게시판
    private final BoardService borderService;
	
	private final JwtService jwtService;

	private final AuthService authService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 페이지 별 게시판 가져오기
	@GetMapping("/boardPage")
	public ResponseEntity<?> getBoarderList(
		@RequestParam String target,
		@RequestParam int page
	){
		
		Pageable pageable = PageRequest.of(page, 10, Sort.by("boardNum").descending());
		
	    switch(target) {
			case "free": return ResponseEntity.ok(borderService.getFreeByPage(pageable));
				
			case "notic": return ResponseEntity.ok(borderService.getNoticByPage(pageable));
				
			case "promotion": return ResponseEntity.ok(borderService.getPromotionByPage(pageable));
				
			case "event": return ResponseEntity.ok(borderService.getEventByPage(pageable));
				
			case "qa": return ResponseEntity.ok(borderService.getQAByPage(pageable));
			
			default:
				return ResponseEntity.notFound().build();
	    }
	}
	
	// 게시판 총 갯수
	@GetMapping("/boardCnt")
	public ResponseEntity<?> getBoarderCnt(
		@RequestParam String target
	){
		
	    switch(target) {
			case "free": return ResponseEntity.ok(borderService.getFreeCnt());
				
			case "notic": return ResponseEntity.ok(borderService.getNoticCnt());
				
			case "promotion": return ResponseEntity.ok(borderService.getPromotionCnt());
				
			case "event": return ResponseEntity.ok(borderService.getEventCnt());
				
			case "qa": return ResponseEntity.ok(borderService.getQACnt());
				
			default:
				return ResponseEntity.notFound().build();
	    }
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판 번호로 상세 정보 가져오기
	@GetMapping("/getDetail")
	public ResponseEntity<?> getBoardDetail(
		@RequestParam String target,
		@RequestParam Long boardNum
	){
		
	    switch(target) {
			case "free": return ResponseEntity.ok(borderService.getFreeDetail(boardNum));
				
			case "notic": return ResponseEntity.ok(borderService.getNoticDetail(boardNum));
				
			case "promotion": return ResponseEntity.ok(borderService.getPromotionDetail(boardNum));
				
			case "event": return ResponseEntity.ok(borderService.getEventDetail(boardNum));
				
			case "qa": return ResponseEntity.ok(borderService.getQADetail(boardNum));
				
			default: return ResponseEntity.notFound().build();
	    }
	}
	
	// 게시판 좋아요 추가
	@GetMapping("/boardLike")
	public void boardLike(
		@RequestParam String target,
		@RequestParam Long boardNum
	){
		
	    switch(target) {
			case "free": borderService.addFreeLike(boardNum); return;
				
			case "notic": borderService.addNoticLike(boardNum); return;
				
			case "promotion": borderService.addPromotionLike(boardNum); return;
				
			case "event": borderService.addEventLike(boardNum); return;
				
			case "qa": borderService.addQALike(boardNum); return;
				
			default: return;
	    }
	}
	
	// 게시판 좋아요 취소
	@GetMapping("/cancelBoardLike")
	public void cancelBoardLike(
		@RequestParam String target,
		@RequestParam Long boardNum
	){
		
	    switch(target) {
			case "free": borderService.addFreeLike(boardNum); return;
				
			case "notic": borderService.addNoticLike(boardNum); return;
				
			case "promotion": borderService.addPromotionLike(boardNum); return;
				
			case "event": borderService.addEventLike(boardNum); return;
				
			case "qa": borderService.addQALike(boardNum); return;
				
			default: return;
	    }
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판 저장, 수정
	@PostMapping("/submitDetail")
	public ResponseEntity<?> submitDetail(
		@RequestParam String target,
		@RequestParam String jwt,
		@RequestParam Long boardNum,
		@RequestBody BoardDto boardDetail
	){
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }

		// 작성자 지정
		String memId = jwtService.getAuthUser(jwt).get("memId", String.class);
		boardDetail.setMemId(memId);
		
		// 게시판 번호가 존재하면 수정, 없으면 새로 작성되는 게시글
		if(boardNum!=null && boardNum!=0) {
			boardDetail.setBoardNum(boardNum);
		}
		
		// 저장시 DB에 생성된 데이터의 게시판 번호를 전송
	    switch(target) {
			case "free": return ResponseEntity.ok(borderService.setFreeDetail(boardDetail));
				
			case "notic": return ResponseEntity.ok(borderService.setNoticDetail(boardDetail));
				
			case "promotion": return ResponseEntity.ok(borderService.setPromotionDetail(boardDetail));
				
			case "event": return ResponseEntity.ok(borderService.setEventDetail(boardDetail));
				
			case "qa": return ResponseEntity.ok(borderService.setQADetail(boardDetail));
				
			default:
				return ResponseEntity.ok(false);
	    }
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
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
	    
		return ResponseEntity.ok(true);
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판 소유주 확인
	@GetMapping("/isOwner")
	public ResponseEntity<?> isOwnerBoard(
		@RequestParam String target,
		@RequestParam Long boardNum,
		@RequestParam String jwt
	){
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// 관리자인 경우
		if(jwtService.getAuthUser(jwt).get("role", String.class)=="ADMIN") {return ResponseEntity.ok(true);}
		
		String memId = jwtService.getAuthUser(jwt).get("memId", String.class);
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
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
}
