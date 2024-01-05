package com.project.festival.Controller.Traval;

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
import com.project.festival.Entity.TravalPack.FileTravalPack;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.FireBaseService;
import com.project.festival.Service.TravalPack.FileTravalPackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FileTravalPackController {
	
	// FireBase Storage
	private final FireBaseService storageService;
	
	private final FileTravalPackService fileTravalPackService;

	private final AuthService authService;
	
	private final ModelMapper modelMapper;
	
	Random rand = new Random();

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 패키지 이미지 가져오기
	@GetMapping("/getFileTravalPack")
	public ResponseEntity<?> getFileTravalPack(
		@RequestParam Long packNum
	) {
		
		List<FileDto> dto = new ArrayList<>();
		
		for(FileTravalPack files : fileTravalPackService.getFiles(packNum)) {
			try {
				FileDto fd = modelMapper.map(files, FileDto.class);
				fd.setImgFile(storageService.getImageFile(files.getFileName()));
				dto.add(fd);
				
			} catch (IOException e) { e.printStackTrace(); continue; }
		}
		
		return ResponseEntity.ok(dto.size() != 0 ? dto : null);
	}

	// 랜덤한 축제 이미지 가져오기
	@GetMapping("/getFileTravalPackRandom")
	public ResponseEntity<?> getFileTravalPackRandom(
		@RequestParam Long packNum
	) {
		
		FileDto dto = new FileDto();
		
		List<FileTravalPack> files = fileTravalPackService.getFiles(packNum);
		if(files.size()==0) {return ResponseEntity.ok(null);}
		
		FileTravalPack fileTravalPack = files.get(rand.nextInt(files.size()));
		
		try {
			dto = modelMapper.map(fileTravalPack, FileDto.class);
			dto.setImgFile(storageService.getImageFile(fileTravalPack.getFileName()));
			
		} catch (IOException e) { e.printStackTrace(); }
		
		return ResponseEntity.ok(dto);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 첨부하고자 하는 파일을 Base64로 인코딩
	@PostMapping("/encodeFileTravalPack")
	public ResponseEntity<?> encodeFileTravalPack(
		@RequestParam String orgName,	// 파일 이름
		@RequestBody MultipartFile file
	){

		FileDto fd = new FileDto();
		StringBuilder sb = new StringBuilder();
	
		// 저장될 파일 위치(예: 'travalPack/이미지 파일명')
		sb.append("travalPack/");
		
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
	
	// 패키지 이미지 정보를 DB에 등록
	@PostMapping("/submitFileFileTravalPack")
	public ResponseEntity<?> submitFileTravalPack(
		@RequestParam Long packNum,
		@RequestBody List<FileDto> dto
	) {
		
		// 이전에 저장된 DB는 제거
		fileTravalPackService.deleteAllFile(packNum);
		
		for(FileDto fd : dto) {
			
			try { storageService.uploadImage(fd); }
			catch (IOException e) { e.printStackTrace(); continue; }
			
			FileTravalPack fileTP = modelMapper.map(fd, FileTravalPack.class);
			fileTP.setPackNum(packNum);
			
			fileTravalPackService.submitFile(fileTP);
		}
		
		return ResponseEntity.ok().build();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 패키지의 특정 이미지만 삭제
	@DeleteMapping("/deleteFileTravalPack")
	public ResponseEntity<?> deleteFileTravalPack(
		@RequestParam Long packNum,
		@RequestParam String jwt,
		@RequestBody FileDto dto
	) {
		
		// 새로 만드는 게시판인 경우 패스(아직 저장되지 않았기 때문)
		if(packNum==0) {return ResponseEntity.ok().build();}
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// FireBase의 이미지 삭제 (없으면 넘기기)
		try { storageService.deleteImage(dto); }
		catch (Exception e) {}

		// DB에 저장된 데이터 삭제
		fileTravalPackService.deleteFile(dto.getFileName());
		
		return ResponseEntity.ok().build();
		
	}

	// 패키지의 모든 이미지 삭제
	@DeleteMapping("/deleteAllFileTravalPack")
	public ResponseEntity<?> deleteAllFileTravalPack(
		@RequestParam Long packNum
	) {
		
		for(FileTravalPack f : fileTravalPackService.getFiles(packNum)) {
			try {
				FileDto fd = modelMapper.map(f, FileDto.class);
				storageService.deleteImage(fd);
			
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}

		// DB에 저장된 데이터 삭제
		fileTravalPackService.deleteAllFile(packNum);
		
		return ResponseEntity.ok().build();
		
	}
}
