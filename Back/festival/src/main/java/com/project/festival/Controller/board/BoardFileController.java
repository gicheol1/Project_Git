package com.project.festival.Controller.board;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
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
import com.project.festival.Entity.board.File.FileEvent;
import com.project.festival.Entity.board.File.FileFree;
import com.project.festival.Entity.board.File.FileNotic;
import com.project.festival.Entity.board.File.FilePromotion;
import com.project.festival.Entity.board.File.FileQA;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.FireBaseService;
import com.project.festival.Service.board.BoardFileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardFileController {
	
	// 파일 정보
	private final BoardFileService fileService;
	
	// FireBase Storage
	private final FireBaseService storageService;

	private final AuthService authService;
	
	private final ModelMapper modelMapper;
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 첨부파일 가져오기
	@GetMapping("/getFile")
	public ResponseEntity<?> getFile(
		@RequestParam String target, // 대상
		@RequestParam Long boardNum // 번호
	){
		
		List<FileDto> dto = new ArrayList<>();
		
		switch(target) {
			case "free": 
				
				for(FileFree files : fileService.getFileFree(boardNum)) {
					try {
						FileDto fd = modelMapper.map(files, FileDto.class);
						fd.setImgFile(storageService.getImageFile(fd.getFileName()));
						dto.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "notic": 
				for(FileNotic files : fileService.getFileNotic(boardNum)) {
					try {
						FileDto fd = modelMapper.map(files, FileDto.class);
						fd.setImgFile(storageService.getImageFile(fd.getFileName()));
						dto.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "promotion": 
				for(FilePromotion files : fileService.getFilePromotion(boardNum)) {
					try {
						FileDto fd = modelMapper.map(files, FileDto.class);
						fd.setImgFile(storageService.getImageFile(fd.getFileName()));
						dto.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "event": 
				for(FileEvent files : fileService.getFileEvent(boardNum)) {
					try {
						FileDto fd = modelMapper.map(files, FileDto.class);
						fd.setImgFile(storageService.getImageFile(fd.getFileName()));
						dto.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "qa": 
				for(FileQA files : fileService.getFileQA(boardNum)) {
					try {
						FileDto fd = modelMapper.map(files, FileDto.class);
						fd.setImgFile(storageService.getImageFile(fd.getFileName()));
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			default:
				return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(dto);
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 첨부하고자 하는 파일을 Base64로 인코딩
	@PostMapping("/encodeFile")
	public ResponseEntity<?> encodeFile(
		@RequestParam String target,	// 대상
		@RequestParam String orgName,	// 파일 이름
		@RequestBody MultipartFile file
	){

		FileDto fd = new FileDto();
		StringBuilder sb = new StringBuilder();
		
		// 저장될 파일 위치(예: 'free/이미지 파일명')
		sb.append(target);
		sb.append('/');
		
		// 랜덤한 파일 이름(실제 저장될 이름)
		sb.append(UUID.randomUUID().toString());
		
		try { 
			
			// 원본 파일을 Base64로 인코딩
			fd.setImgFile(Base64.getEncoder().encodeToString(file.getBytes()));
			
			fd.setContentType(file.getContentType());
			fd.setFileName(sb.toString());
			fd.setOrgName(orgName);
			
		} catch (Exception e) { e.printStackTrace(); }

		return ResponseEntity.ok(fd);
	}
	
	// 첨부한 파일을 FireBase에 업로드하고 DB에 등록
	@PostMapping("/submitFile")
	public ResponseEntity<?> submitFile(
		@RequestParam String target, // 게시판 종류
		@RequestParam Long boardNum, // 게시판 번호
		@RequestBody List<FileDto> dto
	){
		
		switch(target) {
			case "free": 
				
				// 이전에 저장된 DB는 제거
				fileService.deleteAllFileFree(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FileFree fileFree = modelMapper.map(fd, FileFree.class);
					fileFree.setBoardNum(boardNum);
					
					fileService.setFileFree(fileFree);
				}
				
				break;
				
			case "notic": 
				
				fileService.deleteAllFileNotic(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FileNotic fileNotic = modelMapper.map(fd, FileNotic.class);
					fileNotic.setBoardNum(boardNum);
					
					fileService.setFileNotic(fileNotic);
				}
				
				break;
				
			case "promotion": 
				
				fileService.deleteAllFilePromotion(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FilePromotion filePromotion = modelMapper.map(fd, FilePromotion.class);
					filePromotion.setBoardNum(boardNum);
					
					fileService.setFilePromotion(filePromotion);
				}
				
				break;
				
			case "event": 
				
				fileService.deleteAllFileEvent(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FileEvent fileEvent = modelMapper.map(fd, FileEvent.class);
					fileEvent.setBoardNum(boardNum);
					
					fileService.setFileEvent(fileEvent);
				}
				
				break;
				
			case "qa": 
				
				fileService.deleteAllFileQA(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FileQA fileQA = modelMapper.map(fd, FileQA.class);
					fileQA.setBoardNum(boardNum);
					
					fileService.setFileQA(fileQA);
				}
				
				break;
					
			default:
				return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok().build();
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판에 첨부된 특정 파일만 삭제
	@DeleteMapping("/deleteFile")
	public ResponseEntity<?> deleteFile(
		@RequestParam String target, // 게시판 종류
		@RequestParam Long boardNum, // 대상 게시판 번호
		@RequestParam String jwt,
		@RequestBody FileDto dto // 삭제 대상
	){
		
		// 새로 만드는 게시판인 경우 패스(아직 저장되지 않았기 때문)
		if(boardNum==0) {return ResponseEntity.ok().build();}
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// FireBase의 이미지 삭제 (없으면 넘기기)
		try { storageService.deleteImage(dto); }
		catch (Exception e) {}
		
		// DB에 저장된 데이터 삭제
		switch(target) {
		
			case "free": fileService.deleteFileFree(dto.getFileName()); break;
				
			case "notic": fileService.deleteFileNotic(dto.getFileName()); break;
				
			case "promotion": fileService.deleteFilePromotion(dto.getFileName()); break;
				
			case "event": fileService.deleteFileEvent(dto.getFileName()); break;
				
			case "qa": fileService.deleteFileQA(dto.getFileName()); break;
				
			default:
				return ResponseEntity.ok(false);
		}

		return ResponseEntity.ok(true);
	}
	
	// 게시판에 첨부된 모든 첨부파일 삭제
	@DeleteMapping("/deleteAllFile")
	public ResponseEntity<?> deleteAllFile(
		@RequestParam String target, // 대상
		@RequestParam Long boardNum, // 대상 게시판 번호
		@RequestParam String jwt
	){
		
		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// 파일 이름을 받기 위한 리스트
		List<FileDto> fileDto = new ArrayList<>();

		// DTO 리스트를 저장하고 DB에 저장된 데이터 삭제
		switch(target) {
		
			case "free": 
				
				for(FileFree file : fileService.getFileFree(boardNum)) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileFree(boardNum);
				break;
				
			case "notic": 
				
				for(FileNotic file : fileService.getFileNotic(boardNum)) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileNotic(boardNum);
				break;
				
			case "promotion": 
				
				for(FilePromotion file : fileService.getFilePromotion(boardNum)) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFilePromotion(boardNum);
				
				break;
				
			case "event": 
				
				for(FileEvent file : fileService.getFileEvent(boardNum)) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileEvent(boardNum);
				break;
				
			case "qa": 
				
				for(FileQA file : fileService.getFileQA(boardNum)) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileQA(boardNum);
				break;
				
			default:
				return ResponseEntity.ok(false);
		}
		
		// FireBase의 이미지 삭제
		for(FileDto fd : fileDto) {
			try { storageService.deleteImage(fd); }
			catch (Exception e) {
				e.printStackTrace();
				continue;
			}
		}

		return ResponseEntity.ok(true);
	}

}
