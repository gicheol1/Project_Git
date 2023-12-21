package com.project.festival.Controller.festival;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
				
			} catch (IOException e) { e.printStackTrace(); continue; }
		}
		
		return ResponseEntity.ok(dto);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 축제 이미지 저장
	@PostMapping("/setFileFeatival")
	public ResponseEntity<?> setFileFeatival(
		@RequestBody MultipartFile[] files
	) {
		
		List<FileFestivalDto> fileDetail = new ArrayList<>();
		
		if(files != null && files.length != 0) {
			
			StringBuilder sb = new StringBuilder();
			
			// 파일 위치(예: 'festival/이미지 파일명')
			sb.append("festival/");
			
			// 랜덤한 파일 이름(실제 저장될 이름)
			sb.append(UUID.randomUUID().toString());
			
			for(MultipartFile file : files) {
				
				try { 
					FileFestivalDto fd = storageService.uploadImageFestival(file);
					
					fd.setImgFile(Base64.getEncoder().encodeToString(file.getBytes()));
					fd.setContentType(file.getContentType());
					fd.setFileName(sb.toString());
					fd.setOrgName(file.getName());
					
				} catch (IOException e) { e.printStackTrace(); continue; }
			}
		}

		return ResponseEntity.ok(fileDetail);
	}
	
	// 축제 이미지 정보를 DB에 등록
	@PostMapping("/submitFileFeatival")
	public ResponseEntity<?> submitFileFeatival(
		@RequestParam Long festivalNum,
		@RequestBody List<FileFestivalDto> dto
	) {
		
		// 이전에 저장된 DB는 제거
		fileFestivalService.deleteAllFile(festivalNum);
		
		for(FileFestivalDto fd : dto) {
			FileFestival fileFree = new FileFestival(
					festivalNum,
				fd.getFileName(),
				fd.getOrgName()
			);
			
			fileFestivalService.submitFile(fileFree);
		}
		
		return ResponseEntity.ok().build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제 이미지 삭제
	@DeleteMapping("/deleteFileFeatival")
	public ResponseEntity<?> deleteFileFeatival(
		@RequestBody FileFestivalDto dto
	) {
		
		try {
			storageService.deleteImageFestival(dto.getFileName());
			
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
		
		return ResponseEntity.ok().build();
		
	}

	// 축제의 모든 이미지 삭제
	@DeleteMapping("/deleteAllFileFeatival")
	public ResponseEntity<?> deleteAllFileFeatival(
		@RequestParam Long festivalNum
	) {
		
		List<FileFestival> file = fileFestivalService.getFiles(festivalNum);
		
		try {
			for(FileFestival f : file) {
				storageService.deleteImageFestival(f.getFileName());
			}
			
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
		
		fileFestivalService.deleteAllFile(festivalNum);
		
		return ResponseEntity.ok().build();
		
	}

}
