package com.project.festival.Controller.board;

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
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 첨부파일 가져오기
	@GetMapping("/getFile")
	public ResponseEntity<?> getFile(
		@RequestParam String target, // 대상
		@RequestParam Long boardNum // 번호
	){
		
		List<FileDto> fileDetail = new ArrayList<>();
		
		switch(target) {
			case "free": 
				
				// 게시판 번호로 저장된 파일 가져오기
				for(FileFree files : fileService.getFileFree(boardNum)) {
					try {
						
						FileDto fd = storageService.getImageFile(target, files.getFileName());
						fd.setOrgName(files.getOrgName());
						
						fileDetail.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "notic": 
				for(FileNotic files : fileService.getFileNotic(boardNum)) {
					try {
						
						FileDto fd = storageService.getImageFile(target, files.getFileName());
						fd.setOrgName(files.getOrgName());
						
						fileDetail.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "promotion": 
				for(FilePromotion files : fileService.getFilePromotion(boardNum)) {
					try {
						
						FileDto fd = storageService.getImageFile(target, files.getFileName());
						fd.setOrgName(files.getOrgName());
						
						fileDetail.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "event": 
				for(FileEvent files : fileService.getFileEvent(boardNum)) {
					try {
						
						FileDto fd = storageService.getImageFile(target, files.getFileName());
						fd.setOrgName(files.getOrgName());
						
						fileDetail.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			case "qa": 
				for(FileQA files : fileService.getFileQA(boardNum)) {
					try {
						
						FileDto fd = storageService.getImageFile(target, files.getFileName());
						fd.setOrgName(files.getOrgName());
						
						fileDetail.add(fd);
						
					} catch (IOException e) { e.printStackTrace(); continue; }
				}
				
				break;
				
			default:
				return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(fileDetail);
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 첨부파일을 먼저 저장
	@PostMapping("/setFile")
	public ResponseEntity<?> setFile(
		@RequestParam String target, // 대상
		@RequestBody MultipartFile[] files
	){
		
		List<FileDto> fileDetail = new ArrayList<>();
		
		if(files != null && files.length != 0) {
			for(MultipartFile file : files) {
				
				try { 
					FileDto fd = storageService.uploadImage(target, file);
					fd.setOrgName(file.getName().toString());
					fileDetail.add(fd);
					
				} catch (IOException e) { e.printStackTrace(); continue; }
			}
		}

		return ResponseEntity.ok(fileDetail);
	}
	
	// 게시판 저장시 첨부한 파일을 DB에 등록
	@PostMapping("/submitFile")
	public ResponseEntity<?> submitFile(
		@RequestParam String target, // 대상
		@RequestParam Long boardNum, // 번호
		@RequestBody List<FileDto> fileDetail
	){
		
		switch(target) {
			case "free": 
				
				// 이전에 저장된 DB는 제거
				fileService.deleteAllFileFree(boardNum);
				
				for(FileDto fd : fileDetail) {
					FileFree fileFree = new FileFree(
						boardNum,
						fd.getFileName(),
						fd.getOrgName()
					);
					
					fileService.setFileFree(fileFree);
				}
				
				break;
				
			case "notic": 
				
				fileService.deleteAllFileNotic(boardNum);
				
				for(FileDto fd : fileDetail) {
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
				
				for(FileDto fd : fileDetail) {
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
				
				for(FileDto fd : fileDetail) {
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
				
				for(FileDto fd : fileDetail) {
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
	
	// 저장된 첨부파일 삭제
	@DeleteMapping("/deleteFile")
	public ResponseEntity<?> deleteFile(
		@RequestParam String target, // 대상
		@RequestBody FileDto fileDetail
	){
		
		try {
			storageService.deleteImage(target, fileDetail.getFileName());
			
		} catch (IOException e) {
			e.printStackTrace();
		}

		return ResponseEntity.ok().build();
	}
	
	// 게시판에 첨부된 모든 첨부파일 삭제
	@DeleteMapping("/deleteAllFile")
	public ResponseEntity<?> deleteAllFile(
		@RequestParam String target, // 대상
		@RequestParam Long boardNum, // 대상 게시판 번호
		@RequestParam String jwt
	){
		
		if(jwt == null) {
			return ResponseEntity.ok(false);
		}
		
		Claims claims;
		
		try { claims = jwtService.getAuthUser(jwt); }
		catch(Exception e) { return ResponseEntity.ok(false); }
		
		// 토큰 만료시
		if(claims.isEmpty() && !jwtService.isExistsByJti(claims.get("jti", String.class))) {
			return ResponseEntity.ok(false);
		}
		
		String memId = claims.get("memId", String.class);
		
		// 비회원인 경우
		if(userService.findUser(memId).isEmpty()) {
			return ResponseEntity.ok(false);
		}
		
		switch(target) {
			case "free": 
				
				List<FileFree> fFree = fileService.getFileFree(boardNum);
				
				if(fFree != null && fFree.size() != 0) {
					for(FileFree f : fFree) {
						try {
							storageService.deleteImage(target, f.getFileName());
						} catch (IOException e) {
							e.printStackTrace();
							continue;
						}
						fileService.deleteFileFree(f.getFileName());
					}
				}
				
				fileService.deleteAllFileFree(boardNum);
				
				break;
				
			case "notic": 
				
				List<FileNotic> fNotic = fileService.getFileNotic(boardNum);
				
				if(fNotic != null && fNotic.size() != 0) {
					for(FileNotic f : fNotic) {
						try {
							storageService.deleteImage(target, f.getFileName());
						} catch (IOException e) {
							e.printStackTrace();
							continue;
						}
						fileService.deleteFileNotic(f.getFileName());
					}
				}
				
				fileService.deleteAllFileNotic(boardNum);
				
				break;
				
			case "promotion": 
				
				List<FilePromotion> fPromotion = fileService.getFilePromotion(boardNum);
				
				if(fPromotion != null && fPromotion.size() != 0) {
					for(FilePromotion f : fPromotion) {
						try {
							storageService.deleteImage(target, f.getFileName());
						} catch (IOException e) {
							e.printStackTrace();
							continue;
						}
						fileService.deleteFilePromotion(f.getFileName());
					}
				}
				
				fileService.deleteAllFilePromotion(boardNum);
				
				break;
				
			case "event": 
				
				List<FileEvent> fEvent = fileService.getFileEvent(boardNum);
				
				if(fEvent != null && fEvent.size() != 0) {
					for(FileEvent f : fEvent) {
						try {
							storageService.deleteImage(target, f.getFileName());
						} catch (IOException e) {
							e.printStackTrace();
							continue;
						}
						fileService.deleteFileEvent(f.getFileName());
					}
				}
				
				fileService.deleteAllFileEvent(boardNum);
				
				break;
				
			case "qa": 
				
				List<FileQA> fQA = fileService.getFileQA(boardNum);
				
				if(fQA != null && fQA.size() != 0) {
					for(FileQA f : fQA) {
						try {
							storageService.deleteImage(target, f.getFileName());
						} catch (IOException e) {
							e.printStackTrace();
							continue;
						}
						fileService.deleteFileQA(f.getFileName());
					}
				}
				
				fileService.deleteAllFileQA(boardNum);
				
				break;
				
			default:
				return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok().build();
	}

}