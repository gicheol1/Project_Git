package com.project.festival.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Service.FestivalService;

@RestController
public class FestivalController {
	
	@Autowired
	private FestivalService festivalService;

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	@PostMapping("/festivalAll")
	public ResponseEntity<?> getFeativalAll() {
		
		return ResponseEntity.ok(festivalService.getFestivalAll());
	}
}
