package com.project.festival.Controller.board;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Entity.board.CommentDto;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.board.BoardCommService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardCommentController {

	private final BoardCommService boardCommService;
	
	private final JwtService jwtService;

	private final AuthService authService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
    // 게시판 번호로 댓글 가져오기
    @GetMapping("/getComm")
	public ResponseEntity<?> getComment(
		@RequestParam String target,
		@RequestParam Long boardNum
	) {
    	
		switch(target) {
		case "free":
			return ResponseEntity.ok(boardCommService.getCommentsFree(boardNum));
			
		case "notic":
			return ResponseEntity.ok(boardCommService.getCommentsNotic(boardNum));
			
		case "promotion":
			return ResponseEntity.ok(boardCommService.getCommentsPromotion(boardNum));
			
		case "event":
			return ResponseEntity.ok(boardCommService.getCommentsEvent(boardNum));
			
		case "qa":
			return ResponseEntity.ok(boardCommService.getCommentsQA(boardNum));
		
		default:
			return ResponseEntity.notFound().build();
		}
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 댓글 저장, 수정하기
    @PostMapping("/submitComm")
	public ResponseEntity<?> setComment(
		@RequestParam String target,
		@RequestParam Long boardNum,
		@RequestParam String jwt,
		@RequestBody CommentDto comment
	) {
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		String memId = jwtService.getAuthUser(jwt).get("memId", String.class);
		
		comment.setMemId(memId);
    	comment.setBoardNum(boardNum);

		try {
			switch(target) {
				case "free":
					boardCommService.addFree(comment);
					break;
					
				case "notic":
					boardCommService.addNotic(comment);
					break;
					
				case "promotion":
					boardCommService.addPromotion(comment);
					break;
					
				case "event":
					boardCommService.addEvent(comment);
					break;
					
				case "qa":
					boardCommService.addQA(comment);
					break;
				
				default:
					return ResponseEntity.notFound().build();
			}
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 댓글 삭제하기
    @DeleteMapping("/deleteComm")
	public ResponseEntity<?> deleteComment(
		@RequestParam String target,
		@RequestParam Long boardNum,
		@RequestParam Long coNum,
		@RequestParam String jwt
	) {
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }

		try {
			switch(target) {
				case "free":
					boardCommService.deleteCommFreeByCoNum(boardNum, coNum);
					break;
					
				case "notic":
					boardCommService.deleteCommNoticByCoNum(boardNum, coNum);
					break;
					
				case "promotion":
					boardCommService.deleteCommPromotionByCoNum(boardNum, coNum);
					break;
					
				case "event":
					boardCommService.deleteCommEventByCoNum(boardNum, coNum);
					break;
					
				case "qa":
					boardCommService.deleteCommQAByCoNum(boardNum, coNum);
					break;
				
				default:
					return ResponseEntity.notFound().build();
			}
			
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
			
		}
		return ResponseEntity.ok().build();
	}
    
    // 모든 댓글 삭제하기
    @DeleteMapping("/deleteAllComm")
	public ResponseEntity<?> deleteAllComment(
		@RequestParam String target,
		@RequestParam Long boardNum,
		@RequestParam String jwt
	) {
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }

		try {
			switch(target) {
				case "free":
					boardCommService.deleteAllCommFree(boardNum);
					break;
					
				case "notic":
					boardCommService.deleteAllCommNotic(boardNum);
					break;
					
				case "promotion":
					boardCommService.deleteAllCommPromotion(boardNum);
					break;
					
				case "event":
					boardCommService.deleteAllCommEvent(boardNum);
					break;
					
				case "qa":
					boardCommService.deleteAllCommQA(boardNum);
					break;
				
				default:
					return ResponseEntity.notFound().build();
			}
			
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
			
		}
		return ResponseEntity.ok().build();
	}
	
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     
     // 댓글 삭제하기
     @GetMapping("/isOwnerComm")
 	public ResponseEntity<?> isOwnerComment(
 		@RequestParam String target,
 		@RequestParam Long boardNum,
 		@RequestParam Long coNum,
 		@RequestParam String jwt
 	) {
 		
 		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// 관리자인 경우
		if(jwtService.getAuthUser(jwt).get("role", String.class)=="ADMIN") {return ResponseEntity.ok(true);}
 		
 		String memId = jwtService.getAuthUser(jwt).get("memId", String.class);
 		boolean isOwner = false;

		switch(target) {
			case "free":
				isOwner = (boardCommService.isOwnerCommentFree(boardNum, coNum, memId));
				break;
				
			case "notic":
				isOwner = (boardCommService.isOwnerCommentNotic(boardNum, coNum, memId));
				break;
				
			case "promotion":
				isOwner = (boardCommService.isOwnerCommentPromotion(boardNum, coNum, memId));
				break;
				
			case "event":
				isOwner = (boardCommService.isOwnerCommentEvent(boardNum, coNum, memId));
				break;
				
			case "qa":
				isOwner = (boardCommService.isOwnerCommentQA(boardNum, coNum, memId));
				break;
			
			default:
				return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(isOwner);
 	}
    
}
