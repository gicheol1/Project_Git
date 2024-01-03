package com.project.festival.Service.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Entity.board.File.FileEvent;
import com.project.festival.Entity.board.File.FileFree;
import com.project.festival.Entity.board.File.FileNotic;
import com.project.festival.Entity.board.File.FilePromotion;
import com.project.festival.Entity.board.File.FileQA;
import com.project.festival.Entity.board.RepositoryFile.FileEventRepo;
import com.project.festival.Entity.board.RepositoryFile.FileFreeRepo;
import com.project.festival.Entity.board.RepositoryFile.FileNoticRepo;
import com.project.festival.Entity.board.RepositoryFile.FilePromotionRepo;
import com.project.festival.Entity.board.RepositoryFile.FileQARepo;

@Service
public class BoardFileService {
	
	@Autowired
	private FileFreeRepo freeRepo;
	@Autowired
	private FileNoticRepo noticRepo;
	@Autowired
	private FilePromotionRepo promotionRepo;
	@Autowired
	private FileEventRepo eventRepo;
	@Autowired
	private FileQARepo qaRepo;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<FileFree> getFileFree(Long boardNum){
		return freeRepo.findByBoardNumOrderByFileNum(boardNum);
	}
	
	public List<String> getNameFree(Long num) {return freeRepo.findFileNameByBoardNumOrderByFileNum(num);}
	
	public void setFileFree(FileFree fileFree) {freeRepo.save(fileFree);}

	@Transactional
	public void deleteFileFree(String fileName) {freeRepo.deleteByFileName(fileName);}
	@Transactional
	public void deleteAllFileFree(Long boardNum) {freeRepo.deleteAllByBoardNum(boardNum);}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<FileNotic> getFileNotic(Long boardNum){
		return noticRepo.findByBoardNumOrderByFileNum(boardNum);
	}
	
	public List<String> getNameNotic(Long num) {return noticRepo.findFileNameByBoardNumOrderByFileNum(num);}
	
	public void setFileNotic(FileNotic fileNotic) {noticRepo.save(fileNotic);}

	@Transactional
	public void deleteFileNotic(String fileName) {noticRepo.deleteByFileName(fileName);}
	@Transactional
	public void deleteAllFileNotic(Long boardNum) {noticRepo.deleteAllByBoardNum(boardNum);}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<FilePromotion> getFilePromotion(Long boardNum){
		return promotionRepo.findByBoardNumOrderByFileNum(boardNum);
	}
	
	public List<String> getNamePromotion(Long num) {return promotionRepo.findFileNameByBoardNumOrderByFileNum(num);}
	
	public void setFilePromotion(FilePromotion filePromotion) {promotionRepo.save(filePromotion);}

	@Transactional
	public void deleteFilePromotion(String fileName) {promotionRepo.deleteByFileName(fileName);}
	@Transactional
	public void deleteAllFilePromotion(Long boardNum) {promotionRepo.deleteAllByBoardNum(boardNum);}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<FileEvent> getFileEvent(Long boardNum){
		return eventRepo.findByBoardNumOrderByFileNum(boardNum);
	}
	
	public List<String> getNameEvent(Long num) {return eventRepo.findFileNameByBoardNumOrderByFileNum(num);}
	
	public void setFileEvent(FileEvent fileEvent) {eventRepo.save(fileEvent);}

	@Transactional
	public void deleteFileEvent(String fileName) {eventRepo.deleteByFileName(fileName);}
	@Transactional
	public void deleteAllFileEvent(Long boardNum) {eventRepo.deleteAllByBoardNum(boardNum);}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<FileQA> getFileQA(Long boardNum){
		return qaRepo.findByBoardNumOrderByFileNum(boardNum);
	}
	
	public List<String> getNameQA(Long num) {return qaRepo.findFileNameByBoardNumOrderByFileNum(num);}
	
	public void setFileQA(FileQA fileQA) {qaRepo.save(fileQA);}

	@Transactional
	public void deleteFileQA(String fileName) {qaRepo.deleteByFileName(fileName);}
	@Transactional
	public void deleteAllFileQA(Long boardNum) {qaRepo.deleteAllByBoardNum(boardNum);}
}
