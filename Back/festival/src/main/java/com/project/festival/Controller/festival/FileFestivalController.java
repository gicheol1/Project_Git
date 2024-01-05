package com.project.festival.Controller.festival;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.modelmapper.ModelMapper;
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
import com.project.festival.Service.AuthService;
import com.project.festival.Service.FireBaseService;
import com.project.festival.Service.festival.FileFestivalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FileFestivalController {
	
	// FireBase Storage
	private final FireBaseService storageService;
	
	private final FileFestivalService fileFestivalService;

	private final AuthService authService;
	
	private final ModelMapper modelMapper;
	
	Random rand = new Random();

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 축제 이미지 가져오기
	@GetMapping("/getFileFestival")
	public ResponseEntity<?> getFileFestival(
		@RequestParam Long festivalNum
	) {
		
		FileDto fd = new FileDto();
		
		FileFestival files = fileFestivalService.getFile(festivalNum);
		
		try {
			fd = modelMapper.map(files, FileDto.class);
			fd.setImgFile(storageService.getImageFile(files.getFileName()));
			
		} catch (IOException e) { e.printStackTrace(); }
		
		return ResponseEntity.ok(fd);
	}

	// 랜덤한 축제 이미지 가져오기
	@GetMapping("/getFileFestivalRandom")
	public ResponseEntity<?> getFileFestivalRandom(
		@RequestParam Long festivalNum
	) {
		
		FileDto dto = new FileDto();
		
		List<FileFestival> files = fileFestivalService.getFiles(festivalNum);
		if(files.size()==0) {return ResponseEntity.ok(null);}
		
		FileFestival fileFestival = files.get(rand.nextInt(files.size()));
		
		try {
			dto = modelMapper.map(fileFestival, FileDto.class);
			dto.setImgFile(storageService.getImageFile(fileFestival.getFileName()));
			
		} catch (IOException e) { e.printStackTrace(); }
		
		return ResponseEntity.ok(dto);
	}

	// 축제 이미지들 가져오기
	@GetMapping("/getFileFestivalList")
	public ResponseEntity<?> getFileFestivalList(
		@RequestParam List<Long> festivalNum
	) {
		
		List<FileDto> dto = new ArrayList<>();
		
		for(Long num : festivalNum) {
			for(FileFestival files : fileFestivalService.getFiles(num)) {
				try {
					FileDto fd = modelMapper.map(files, FileDto.class);
					fd.setImgFile(storageService.getImageFile(files.getFileName()));
					dto.add(fd);
					
				} catch (IOException e) { e.printStackTrace(); continue; }
			}
		}
		return ResponseEntity.ok(dto.size() != 0 ? dto : null);
	}
	
	//축제 이미지 전부 가져오기
	@GetMapping("/getFileFestivalAll")
	public ResponseEntity<?> getFileFestivalAll() {
		
		List<FileDto> dto = new ArrayList<>();
		
		for(FileFestival files : fileFestivalService.getFilesAll()) {
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
			fd.setOrgName(orgName);
			
		} catch (IOException e) { e.printStackTrace(); }
	
		return ResponseEntity.ok(fd);
	}
	
	// 축제 이미지 정보를 DB에 등록
	@PostMapping("/submitFileFestival")
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
	
	// 축제에 첨부된 특정 파일만 삭제
	@DeleteMapping("/deleteFileFestival")
	public ResponseEntity<?> deleteFileFestival(
		@RequestParam Long festivalNum, // 대상 축제 번호
		@RequestParam String jwt,
		@RequestBody FileDto dto
	){
		
		// 새로 만드는 축제인 경우 패스(아직 저장되지 않았기 때문)
		if(festivalNum==0) {return ResponseEntity.ok().build();}
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// FireBase의 이미지 삭제 (없으면 넘기기)
		try { storageService.deleteImage(dto); }
		catch (Exception e) {}

		// DB에 저장된 데이터 삭제
		fileFestivalService.deleteFile(dto.getFileName());

		return ResponseEntity.ok().build();
	}

	// 축제의 모든 이미지 삭제
	@DeleteMapping("/deleteAllFileFestival")
	public ResponseEntity<?> deleteAllFileFestival(
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

		// DB에 저장된 데이터 삭제
		fileFestivalService.deleteAllFile(festivalNum);
		
		return ResponseEntity.ok().build();
		
	}
}
