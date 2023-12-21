package com.project.festival.Controller.board;

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
import com.project.festival.Entity.board.File.FileEvent;
import com.project.festival.Entity.board.File.FileFree;
import com.project.festival.Entity.board.File.FileNotic;
import com.project.festival.Entity.board.File.FilePromotion;
import com.project.festival.Entity.board.File.FileQA;
import com.project.festival.Service.FireBaseService;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.UserService;
import com.project.festival.Service.board.BoardFileService;

import io.jsonwebtoken.Claims;

@RestController
public class BoardFileController {
	
	// 파일 정보
	@Autowired
	private BoardFileService fileService;
	
	// FireBase Storage
	@Autowired
	private FireBaseService storageService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper modelMapper;
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
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
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 첨부하고자 하는 파일을 Base64로 인코딩
	@PostMapping("/encodeFile")
	public ResponseEntity<?> encodeFile(
		@RequestParam String target, // 대상
		@RequestBody MultipartFile[] files
	){
		
		List<FileDto> dto = new ArrayList<>();
		
		if(files != null && files.length != 0) {
			for(MultipartFile file : files) {
				
				StringBuilder sb = new StringBuilder();
				
				// 저장될 파일 위치(예: 'free/이미지 파일명')
				sb.append(target);
				sb.append('/');
				
				// 랜덤한 파일 이름(실제 저장될 이름)
				sb.append(UUID.randomUUID().toString());
				
				try { 
					FileDto fd = new FileDto();
					
					fd.setImgFile(Base64.getEncoder().encodeToString(file.getBytes()));
					fd.setContentType(file.getContentType());
					fd.setFileName(sb.toString());
					fd.setOrgName(file.getName());
					
					dto.add(fd);
					
				} catch (IOException e) { e.printStackTrace(); continue; }
			}
		}

		return ResponseEntity.ok(dto);
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
					
					FileFree fileFree = modelMapper.map(dto, FileFree.class);
					fileFree.setBoardNum(boardNum);
					
					fileService.setFileFree(fileFree);
				}
				
				break;
				
			case "notic": 
				
				fileService.deleteAllFileNotic(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FileNotic fileNotic = new FileNotic(
						boardNum,
						fd.getFileName(),
						fd.getOrgName()
					);
					
					fileService.setFileNotic(fileNotic);
				}
				
				break;
				
			case "promotion": 
				
				fileService.deleteAllFilePromotion(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FilePromotion filePromotion = new FilePromotion(
						boardNum,
						fd.getFileName(),
						fd.getOrgName()
					);
					
					fileService.setFilePromotion(filePromotion);
				}
				
				break;
				
			case "event": 
				
				fileService.deleteAllFileEvent(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FileEvent fileEvent = new FileEvent(
						boardNum,
						fd.getFileName(),
						fd.getOrgName()
					);
					
					fileService.setFileEvent(fileEvent);
				}
				
				break;
				
			case "qa": 
				
				fileService.deleteAllFileQA(boardNum);
				
				for(FileDto fd : dto) {
					
					try { storageService.uploadImage(fd); }
					catch(Exception e) { e.printStackTrace(); continue; }
					
					FileQA fileQA = new FileQA(
						boardNum,
						fd.getFileName(),
						fd.getOrgName()
					);
					
					fileService.setFileQA(fileQA);
				}
				
				break;
					
			default:
				return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok().build();
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 게시판에 첨부된 모든 첨부파일 삭제
	@DeleteMapping("/deleteAllFile")
	public ResponseEntity<?> deleteAllFile(
		@RequestParam String target, // 대상
		@RequestParam Long boardNum, // 대상 게시판 번호
		@RequestParam String jwt
	){
		
		if(jwt == null) { return ResponseEntity.ok(false); }
		
		Claims claims;
		
		try { claims = jwtService.getAuthUser(jwt); }
		catch(Exception e) { return ResponseEntity.ok(false); }
		
		// 토큰 만료시
		if(claims.isEmpty() && !jwtService.isExistsByJti(claims.get("jti", String.class))) {
			return ResponseEntity.ok(false);
		}
		
		String memId = claims.get("memId", String.class);
		
		// 비회원인 경우
		if(userService.findUser(memId).isEmpty()) { return ResponseEntity.ok(false); }
		
		// 파일 이름을 받기 위한 리스트
		List<FileDto> fileDto = new ArrayList<>();
		
		switch(target) {
		
			case "free": 
				List<FileFree> fileFree = fileService.getFileFree(boardNum);
				
				for(FileFree file : fileFree) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileFree(boardNum);
				
				break;
				
			case "notic": 
				List<FileNotic> fileNotic = fileService.getFileNotic(boardNum);
				
				for(FileNotic file : fileNotic) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileNotic(boardNum);
				
				break;
				
			case "promotion": 
				List<FilePromotion> filePromotion = fileService.getFilePromotion(boardNum);
				
				for(FilePromotion file : filePromotion) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFilePromotion(boardNum);
				
				break;
				
			case "event": 
				List<FileEvent> fileEvent = fileService.getFileEvent(boardNum);
				
				for(FileEvent file : fileEvent) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileEvent(boardNum);
				
				break;
				
			case "qa": 
				List<FileQA> fileQA = fileService.getFileQA(boardNum);
				
				for(FileQA file : fileQA) {
					FileDto fd = modelMapper.map(file, FileDto.class);
					fileDto.add(fd);
				}
				
				fileService.deleteAllFileQA(boardNum);
				
				break;
				
			default:
				return ResponseEntity.notFound().build();
		}
		
		// FireBase의 이미지 삭제
		for(FileDto fd : fileDto) {
			try { storageService.deleteImage(fd); }
			catch (Exception e) {
				e.printStackTrace();
				continue;
			}
		}
		

		return ResponseEntity.ok().build();
	}

}
