package com.project.festival.Controller;

import java.util.Optional;

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

import com.project.festival.Dto.BlackListDto;
import com.project.festival.Entity.BlackList;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.BlackListService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BlackListController {
	
	private final BlackListService blackService;

	private final AuthService authService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 페이지별로 차단된 회원 불러오기
	@GetMapping("/getBlackListPage")
	public ResponseEntity<?> getBlackListPage(
		@RequestParam int page
	) {
		
		Pageable pageable = PageRequest.of(page, 10, Sort.by("banDate").descending());
		
		return ResponseEntity.ok(blackService.getBlackList(pageable));
	}

	// 저장된 블랙리스트 갯수
	@GetMapping("/getBlackListCnt")
	public ResponseEntity<?> getBlackListCnt() {
		return ResponseEntity.ok(blackService.getBlackListCnt());
	}

	// 블랙리스트 상세 정보 가져오기
	@GetMapping("/getBlackDetail")
	public ResponseEntity<?> getBlackDetail(
		@RequestParam Long blackNum,
		@RequestParam String jwt
	) {
		
		if(!authService.isAdmin(jwt)) { return ResponseEntity.ok(false); }
		
		Optional<BlackList> blackList = blackService.getBlackListDetail(blackNum);
		
		if(blackList.isEmpty()) { return ResponseEntity.ok(false); }
		
		return ResponseEntity.ok(blackList.get());
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 회원 차단하기
	@PostMapping("/addBlackList")
	public ResponseEntity<?> addBlackList(
		@RequestBody BlackListDto dto
	) {
		return ResponseEntity.ok(blackService.setBlackList(dto));
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 차단 해제하기
	@DeleteMapping("/deleteBlackList")
	public ResponseEntity<?> deleteBlackList(
		@RequestParam Long blackNum,
		@RequestParam String jwt
	) {
		
		if(!authService.isAdmin(jwt)) { return ResponseEntity.ok(false); }
		
		try {
			blackService.deleteBlackList(blackNum);
		} catch(Exception e) {
			return ResponseEntity.ok(false);
		}
		
		return ResponseEntity.ok(true);
	}

}
