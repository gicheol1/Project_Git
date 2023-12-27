package com.project.festival.Controller.Traval;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

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

import com.project.festival.Dto.TravalPackDto;
import com.project.festival.Entity.TravalPack.TravalPack;
import com.project.festival.Entity.TravalPack.Repo.TravalPackRepository;
import com.project.festival.Service.TravalPack.TravalPackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TravalPackController {
	private final TravalPackService packService;
	private final TravalPackRepository packRepository;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 페이지 별 패키지 여행 가져오기
	@GetMapping("/getTravalPackPage")
	public ResponseEntity<?> getTravalPackPage(
		@RequestParam int page,
		@RequestParam List<Integer> days,
		@RequestParam String location,
		@RequestParam String search
	){
		
		Pageable pageable = PageRequest.of(page, 10, Sort.by("boardNum").descending());
		
		List<TravalPack> tp = new ArrayList<>();
		
		if(days.size()!=0 && location!=null) {
			tp = packService.getTravalPageDateAndLocation(pageable, days, location);
		} else if(days.size()!=0) {
			tp = packService.getTravalPageDateDiff(pageable, days);
		} else if(location!=null) {
			tp = packService.getTravalPageLocation(pageable, location);
		} else {
			tp = packService.getTravalPage(pageable);
		}
		
		return ResponseEntity.ok(tp);
		
	}
	
	// 패키지 여행 전체 갯수
	@GetMapping("/getTravalPackCnt")
	public ResponseEntity<?> getTravalPackCnt(
		@RequestParam List<Integer> days,
		@RequestParam String location,
		@RequestParam String search
	){
		
		Long cnt = 0L;
		
		if(days.size()!=0 && location!=null) {
			cnt = packService.getTravalDateAndLocationCnt(days, location);
		} else if(days.size()!=0) {
			cnt = packService.getTravalDateDiffCnt(days);
		} else if(location!=null) {
			cnt = packService.getTravalLocationCnt(location);
		} else {
			cnt = packService.getTravalCnt();
		}
		
		return ResponseEntity.ok(cnt);
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 패키지 여행 전체 조회
	@GetMapping("/getTravalpackAll")
	private Iterable<TravalPack> getTravalpackAll() { return packRepository.findAll(); }

	// 패키지 여행 세부조회(번호를 통한 조회)
	@GetMapping("/getTravalpack")
	private ResponseEntity<?> getTravalpack(
		@RequestParam Long packNum
	) {
		return ResponseEntity.ok(packRepository.findByPackNum(packNum));
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 새 패키지 여행 추가
	@PostMapping("/setTravalpack")
	public ResponseEntity<?> setTravalpack(
		@RequestBody TravalPackDto packDto
	) {
		Long packNum = packService.addPack(packDto);
		
		System.out.println(packNum);
		
		return ResponseEntity.ok(packNum);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 패키지 여행 삭제
	@DeleteMapping("/deleteTravalpack")
	public ResponseEntity<Void> deleteTravalpack(
		@RequestParam Long packNum
	) {
		packService.deleteTravalpack(packNum);
		return ResponseEntity.noContent().build();// No Content(204) 상태 코드를 반환
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 가상의 패키지 여행 생성
	@PostConstruct
	private void createTravalPack() {
		ArrayList<TravalPackDto> TravalPackList = TravalPackDto.createTravalPack();
		packService.createTravalPack(TravalPackList);
	}
}


/* 
 * - ResponseEntity: HTTP 응답을 나타내는 Spring의 클래스로, 응답의 상태코드, 헤더, 본문(body) 등을 포함합니다.
 * - @RequestParam: 클라이언트로부터 전달된 요청 매개변수를 메서드의 매개변수에 매핑하는 어노테이션입니다.
 * - Long packNum: "packNum"이라는 요청 매개변수를 Long 타입으로 받습니다.
 * - packRepository.findByPackNum(packNum): packRepository에서 packNum을 사용하여 해당하는 데이터를 찾아옵니다. 
 * - 예시: http://localhost:8090/getTravalpack?packNum=123
 *  */
