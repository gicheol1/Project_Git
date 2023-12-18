package com.project.festival.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Dto.FestivalDto;
import com.project.festival.Service.FestivalService;

@RestController
public class FestivalController {
	
	@Autowired
	private FestivalService festivalService;

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// 모든 축제 가져오기
	@PostMapping("/festivalAll")
	public ResponseEntity<?> getFeativalAll() {
		
		return ResponseEntity.ok(festivalService.getFestivalAll());
	}

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// 축제 추가
	@PostMapping("/submitFeatival")
	public ResponseEntity<?> submitFeatival(
		@RequestBody FestivalDto festivalDto
	) {
		festivalService.setNewFeatival(festivalDto);
		return ResponseEntity.ok().build();
	}
}
