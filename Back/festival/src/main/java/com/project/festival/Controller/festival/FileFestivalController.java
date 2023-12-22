package com.project.festival.Controller.festival;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.festival.Dto.FileDto;
import com.project.festival.Entity.festival.FileFestival;
import com.project.festival.Service.FireBaseService;
import com.project.festival.Service.festival.FileFestivalService;

@RestController
public class FileFestivalController {
	
	// FireBase Storage
	@Autowired
	private FireBaseService storageService;
	
	@Autowired
	private FileFestivalService fileFestivalService;
	
	@Autowired
	private ModelMapper modelMapper;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제 이미지 가져오기
	@GetMapping("/getFileFeatival")
	public ResponseEntity<?> getFileFeatival(
		@RequestParam Long festivalNum
	) {
		
		List<FileDto> dto = new ArrayList<>();
		
		for(FileFestival files : fileFestivalService.getFiles(festivalNum)) {
			try {
				FileDto fd = modelMapper.map(files, FileDto.class);
				fd.setImgFile(storageService.getImageFile(files.getFileName()));
				dto.add(fd);
				
			} catch (IOException e) { e.printStackTrace(); continue; }
		}
		
		return ResponseEntity.ok(dto);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 첨부하고자 하는 파일을 Base64로 인코딩
	@PostMapping("/encodeFileFestival")
	public ResponseEntity<?> encodeFileFestival(
		@RequestParam String orgName,	// 파일 이름
		@RequestBody MultipartFile file
	){

		FileDto fd = new FileDto();
		StringBuilder sb = new StringBuilder();
	
		// 저장될 파일 위치(예: 'festival/이미지 파일명')
		sb.append("festival/");
		
		// 랜덤한 파일 이름(실제 저장될 이름)
		sb.append(UUID.randomUUID().toString());
		
		try { 

			// 원본 파일을 Base64로 인코딩
			fd.setImgFile(Base64.getEncoder().encodeToString(file.getBytes()));
			
			fd.setContentType(file.getContentType());
			fd.setFileName(sb.toString());
			fd.setOrgName(file.getName());
			
		} catch (IOException e) { e.printStackTrace(); }
	
		return ResponseEntity.ok(fd);
	}
	
	// 축제 이미지 정보를 DB에 등록
	@PostMapping("/submitFileFeatival")
	public ResponseEntity<?> submitFileFeatival(
		@RequestParam Long festivalNum,
		@RequestBody List<FileDto> dto
	) {
		
		// 이전에 저장된 DB는 제거
		fileFestivalService.deleteAllFile(festivalNum);
		
		for(FileDto fd : dto) {
			
			try { storageService.uploadImage(fd); }
			catch (IOException e) { e.printStackTrace(); continue; }
			
			FileFestival fileFree = modelMapper.map(fd, FileFestival.class);
			fileFree.setFestivalNum(festivalNum);
			
			fileFestivalService.submitFile(fileFree);
		}
		
		return ResponseEntity.ok().build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제의 모든 이미지 삭제
	@DeleteMapping("/deleteAllFileFeatival")
	public ResponseEntity<?> deleteAllFileFeatival(
		@RequestParam Long festivalNum
	) {
		
		for(FileFestival f : fileFestivalService.getFiles(festivalNum)) {
			try {
				FileDto fd = modelMapper.map(f, FileDto.class);
				storageService.deleteImage(fd);
			
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
		
		fileFestivalService.deleteAllFile(festivalNum);
		
		return ResponseEntity.ok().build();
		
	}
}
