package com.project.festival.Controller.festival;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.multipart.MultipartFile;

import com.project.festival.Dto.FestivalDto;
import com.project.festival.Entity.board.FileDto;
import com.project.festival.Entity.festival.Festival;
import com.project.festival.Service.FireBaseService;
import com.project.festival.Service.festival.FestivalService;

@RestController
public class FileFestivalController {
	
	// FireBase Storage
	@Autowired
	private FireBaseService storageService;
	
	@Autowired
	private FestivalService festivalService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 모든 축제 가져오기
	@GetMapping("/festivalAll")
	public ResponseEntity<?> getFeativalAll() { return ResponseEntity.ok(festivalService.getFestivalAll()); }
    
    // 페이지 별 축제 10개씩 가져오기
	@GetMapping("/festivalPage")
	public ResponseEntity<?> getFestivalPage(@RequestParam int page){
		Pageable pageable = PageRequest.of(page, 10, Sort.by("festivalNum").descending());
		return ResponseEntity.ok(festivalService.getFestivalPage(pageable));
	}
	
	// 등록된 축제 총 갯수
	@GetMapping("/festivalCnt")
	public ResponseEntity<?> getFestivalPage(){ return ResponseEntity.ok(festivalService.getFestivalCnt()); }

//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제 정보 가져오기
	@GetMapping("/getFeatival")
	public ResponseEntity<?> getFeatival(
		@RequestParam Long festivalNum
	) {
		
		Festival festival = festivalService.getFestival(festivalNum);
		
		if(festival==null) {
			return ResponseEntity.ok(false);
		} else {
			return ResponseEntity.ok(festivalService.getFestival(festivalNum));
		}
		
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 축제 이미지 추가
	@PostMapping("/setFeativalFile")
	public ResponseEntity<?> setFeativalFile(
		@RequestBody MultipartFile[] files
	) {
		
		List<FileDto> fileDetail = new ArrayList<>();
		
		if(files != null && files.length != 0) {
			for(MultipartFile file : files) {
				
				try { 
					FileDto fd = storageService.uploadImageFestival(file);
					fd.setOrgName(file.getName().toString());
					fileDetail.add(fd);
					
				} catch (IOException e) { e.printStackTrace(); continue; }
			}
		}

		return ResponseEntity.ok(fileDetail);
	}
	
	// 축제 이미지 등록
	@PostMapping("/submitFeativalFile")
	public ResponseEntity<?> submitFeativalFile(
		@RequestParam Long festivalNum
	) {
		
		

		return ResponseEntity.ok().build();
	}
	
// ========== ========== ========== ========== ========== ========== ==========

	// 축제 추가
	@PostMapping("/submitFeatival")
	public ResponseEntity<?> submitFeatival(
		@RequestBody FestivalDto festivalDto
	) {
		festivalService.setNewFeatival(festivalDto);
		return ResponseEntity.ok().build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제 삭제
	@DeleteMapping("/deleteFeatival")
	public ResponseEntity<?> deleteFeatival(
			@RequestParam Long festivalNum
	) {
		festivalService.deleteFestival(festivalNum);
		return ResponseEntity.ok().build();
	}

	// 축제 이미지 삭제
	@DeleteMapping("/deleteFeativalFile")
	public ResponseEntity<?> deleteFeativalFile(
			@RequestParam Long festivalNum
	) {
		festivalService.deleteFestival(festivalNum);
		return ResponseEntity.ok().build();
	}
	
}
