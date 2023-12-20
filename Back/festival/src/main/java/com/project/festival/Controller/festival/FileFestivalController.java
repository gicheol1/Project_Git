package com.project.festival.Controller.festival;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.festival.Entity.board.FileDto;
import com.project.festival.Entity.board.File.FileFree;
import com.project.festival.Entity.festival.FileFestival;
import com.project.festival.Entity.festival.FileFestivalDto;
import com.project.festival.Service.FireBaseService;
import com.project.festival.Service.festival.FileFestivalService;

@RestController
public class FileFestivalController {
	
	// FireBase Storage
	@Autowired
	private FireBaseService storageService;
	
	@Autowired
	private FileFestivalService fileFestivalService;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제 이미지 가져오기
	@GetMapping("/getFileFeatival")
	public ResponseEntity<?> getFileFeatival(
		@RequestParam Long festivalNum
	) {
		
		List<FileFestivalDto> dto = new ArrayList<>();
		
		for(FileFestival files : fileFestivalService.getFiles(festivalNum)) {
			try {
				
				FileFestivalDto d = storageService.getImageFileFestival(files.getFileName());
				d.setOrgName(files.getOrgName());
				dto.add(d);
				
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
		
		return ResponseEntity.ok(dto);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 축제 이미지 추가
	@PostMapping("/setFeativalFile")
	public ResponseEntity<?> setFeativalFile(
		@RequestBody MultipartFile[] files
	) {
		
		List<FileFestivalDto> fileDetail = new ArrayList<>();
		
		if(files != null && files.length != 0) {
			for(MultipartFile file : files) {
				
				try { 
					FileFestivalDto fd = storageService.uploadImageFestival(file);
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
		@RequestParam Long festivalNum,
		@RequestBody FileFestivalDto[] dto
	) {
		
		// 이전에 저장된 DB는 제거
		fileFestivalService.deleteAllFile(festivalNum);
		
		fileFestivalService.submitFile(dto);
		return ResponseEntity.ok().build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제 이미지 삭제
	@DeleteMapping("/deleteFeativalFile")
	public ResponseEntity<?> deleteFeativalFile(
		@RequestParam Long festivalNum
	) {
		
		fileFestivalService.deleteAllFile(festivalNum);
		return ResponseEntity.ok().build();
		
	}

}
