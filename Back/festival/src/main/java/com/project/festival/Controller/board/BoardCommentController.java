package com.project.festival.Controller.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Entity.board.CommentDto;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.UserService;
import com.project.festival.Service.board.BoardCommService;

import io.jsonwebtoken.Claims;

@RestController
public class BoardCommentController {

	@Autowired
	private BoardCommService boardCommService;
	
	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserService userService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
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
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 댓글 저장하기
    @GetMapping("/submitComm")
	public ResponseEntity<?> setComment(
		@RequestParam String target,
		@RequestParam Long boardNum,
		@RequestParam String jwt,
		@RequestBody CommentDto comment
	) {
		
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
		
		comment.setMemId(memId);
    	comment.setBoardNum(boardNum);

		try {
			switch(target) {
				case "free":
					boardCommService.setFree(comment);
					break;
					
				case "notic":
					boardCommService.setNotic(comment);
					break;
					
				case "promotion":
					boardCommService.setPromotion(comment);
					break;
					
				case "event":
					boardCommService.setEvent(comment);
					break;
					
				case "qa":
					boardCommService.setQA(comment);
					break;
				
				default:
					return ResponseEntity.notFound().build();
			}
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 댓글 삭제하기
    @DeleteMapping("/deleteComm")
	public ResponseEntity<?> deleteComment(
		@RequestParam String target,
		@RequestParam Long boardNum,
		@RequestParam Long coNum,
		@RequestParam String jwt
	) {
		
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
	
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
 // ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     
     // 댓글 삭제하기
     @GetMapping("/isOwnerComm")
 	public ResponseEntity<?> isOwnerComment(
 		@RequestParam String target,
 		@RequestParam Long boardNum,
 		@RequestParam Long coNum,
 		@RequestParam String jwt
 	) {
 		
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
    
}
