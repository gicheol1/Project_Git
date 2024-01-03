package com.project.festival.Service.festival;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Entity.festival.FileFestival;
import com.project.festival.Entity.festival.FileFestivalRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileFestivalService {

	private final FileFestivalRepo fileFestivalRepository;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 해당 축제 번호의 이미지 가져오기
	public FileFestival getFile(Long festivalNum) {
		
		Optional<FileFestival> festival = fileFestivalRepository.findByFestivalNum(festivalNum);
		
		if(festival.isEmpty()) {return null;}
		
		return festival.get();
	}
	
	// 해당 축제 번호의 이미지 가져오기
	public List<FileFestival> getFiles(Long festivalNum) {
		return fileFestivalRepository.findByFestivalNumOrderByFileNum(festivalNum);
	}
	
	public List<FileFestival> getFilesAll() { return fileFestivalRepository.findAll(); }

	// 해당 축제 번호의 이미지 이름만 가져오기
	public List<String> getName(Long festivalNum) {
		return fileFestivalRepository.findFileNameByFestivalNumOrderByFileNum(festivalNum);
	}
	
	// 축제 이미지 정보 저장
	public void submitFile(FileFestival fileFestival) {
		fileFestivalRepository.save(fileFestival);
	}
	
	// 특정 이미지만 삭제
	@Transactional
	public void deleteFile(String fileName) {fileFestivalRepository.deleteByFileName(fileName);}
	
	// 축제 번호의 이미지 삭제
	@Transactional
	public void deleteAllFile(Long festivalNum) {fileFestivalRepository.deleteAllByFestivalNum(festivalNum);}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
}
