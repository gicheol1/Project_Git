package com.project.festival.Service.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Entity.board.BoardDto;
import com.project.festival.Entity.board.Entity.BoardEvent;
import com.project.festival.Entity.board.Entity.BoardFree;
import com.project.festival.Entity.board.Entity.BoardNotic;
import com.project.festival.Entity.board.Entity.BoardPromotion;
import com.project.festival.Entity.board.Entity.BoardQA;
import com.project.festival.Entity.board.Repository.BoardEventRepo;
import com.project.festival.Entity.board.Repository.BoardFreeRepo;
import com.project.festival.Entity.board.Repository.BoardNoticRepo;
import com.project.festival.Entity.board.Repository.BoardPromotionRepo;
import com.project.festival.Entity.board.Repository.BoardQARepo;

@Service
public class BoardService {

    @Autowired
    private BoardFreeRepo BFRepo;
    @Autowired
    private BoardNoticRepo BNRepo;
    @Autowired
    private BoardPromotionRepo BPRepo;
    @Autowired
    private BoardEventRepo BERepo;
    @Autowired
    private BoardQARepo BQARepo;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒Board Free▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    // 페이지마다 날짜 기준 내림차순으로 가져오기
    public List<BoardFree> getFreeByPage(Pageable pageable) {
		return BFRepo.findAllByOrderByDateDesc(pageable).getContent();
    }
    
    // 저장된 게시판 갯수
    public long getFreeCnt() { return BFRepo.count(); }
    
    // 게시판 상세 정보 가져오기
    // 이때 리뷰수를 1만큼 증가시킨다
    public BoardFree getFreeDetail(Long bNum) {
    	BoardFree b = BFRepo.findByBoardNum(bNum);
    	b.setReview(b.getReview()+1);
    	BFRepo.save(b);
		return b;
    }
    
    // 게시판 좋아요 추가
    public void addFreeLike(Long bNum) {
    	BoardFree b = BFRepo.findByBoardNum(bNum);
    	b.setLikeCnt(b.getLikeCnt()+1);
    	BFRepo.save(b);
		return;
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    // 게시판 생성, 수정
    public Long setFreeDetail(BoardDto boardDto) {
    	
    	BoardFree bf = new BoardFree();
    	
		// 게시판 수정시
    	if(boardDto.getBoardNum()!=null) {
    		
    		// 기존 게시판 불러오기
    		bf = BFRepo.findByBoardNumAndMemId(
				boardDto.getBoardNum(),
				boardDto.getMemId()
			);
    		
    		// 기존 날짜와 리뷰, 좋아요 수 지정
    		bf.setDate(boardDto.getDate());
        	
        	Long _review = boardDto.getReview();
        	Long _likeCnt = boardDto.getLikeCnt();
        	
        	bf.setReview(_review != null ? _review : 0);
        	bf.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}
    	
    	// 작성자, 제목, 내용 지정
		bf.setMemId(boardDto.getMemId());
    	bf.setTitle(boardDto.getTitle());
    	bf.setContent(boardDto.getContent());
    	
    	return BFRepo.save(bf).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    // 게시판 삭제
	@Transactional
    public void deleteFree(Long boardNum) { BFRepo.deleteById(boardNum); }
    
    // 소유자 확인
    public boolean isOwnerFree(Long boardNum, String memId) {
    	return BFRepo.existsByBoardNumAndMemId(boardNum, memId);
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒BoardNotic▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 페이지마다 날짜 기준 내림차순으로 가져오기
    public List<BoardNotic> getNoticByPage(Pageable pageable) {
		return BNRepo.findAllByOrderByDateDesc(pageable).getContent();
    }

    // 저장된 게시판 갯수
    public long getNoticCnt() { return BNRepo.count(); }

    // 게시판 상세 정보 가져오기
    // 이때 리뷰수를 1만큼 증가시킨다
    public BoardNotic getNoticDetail(Long bNum) {
    	BoardNotic b = BNRepo.findByBoardNum(bNum);
    	b.setReview(b.getReview()+1);
    	BNRepo.save(b);
		return b;
    }

    // 게시판 좋아요 추가
    public void addNoticLike(Long bNum) {
    	BoardNotic b = BNRepo.findByBoardNum(bNum);
    	b.setLikeCnt(b.getLikeCnt()+1);
    	BNRepo.save(b);
		return;
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setNoticDetail(BoardDto boardDto) {
    	
    	BoardNotic bn = new BoardNotic();

		// 게시판 수정시
    	if(boardDto.getBoardNum()!=null) {
    		
    		// 기존 게시판 불러오기
    		bn = BNRepo.findByBoardNumAndMemId(
				boardDto.getBoardNum(),
				boardDto.getMemId()
    		);
    		
    		// 기존 날짜와 리뷰, 좋아요 수 지정
    		bn.setDate(boardDto.getDate());
        	
        	Long _review=boardDto.getReview();
        	Long _likeCnt=boardDto.getLikeCnt();
        	
        	bn.setReview(_review != null ? _review : 0);
        	bn.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}

    	// 작성자, 제목, 내용 지정
		bn.setMemId(boardDto.getMemId());
		bn.setTitle(boardDto.getTitle());
		bn.setContent(boardDto.getContent());
    	
    	return BNRepo.save(bn).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 게시판 삭제
	@Transactional
    public void deleteNotic(Long boardNum) { BNRepo.deleteById(boardNum); }

    // 소유자 확인
    public boolean isOwnerNotic(Long boardNum, String memId) {
    	return BNRepo.existsByBoardNumAndMemId(boardNum, memId);
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒BoardPromotion▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 페이지마다 날짜 기준 내림차순으로 가져오기
    public List<BoardPromotion> getPromotionByPage(Pageable pageable) {
		return BPRepo.findAllByOrderByDateDesc(pageable).getContent();
    }

    // 저장된 게시판 갯수
    public long getEventCnt() { return BPRepo.count(); }

    // 게시판 상세 정보 가져오기
    // 이때 리뷰수를 1만큼 증가시킨다
    public BoardPromotion getPromotionDetail(Long bNum) {
    	BoardPromotion b = BPRepo.findByBoardNum(bNum);
    	b.setReview(b.getReview()+1);
    	BPRepo.save(b);
		return b;
    }

    // 게시판 좋아요 추가
    public void addPromotionLike(Long bNum) {
    	BoardPromotion b = BPRepo.findByBoardNum(bNum);
    	b.setLikeCnt(b.getLikeCnt()+1);
    	BPRepo.save(b);
		return;
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setPromotionDetail(BoardDto boardDto) {
    	
    	BoardPromotion bp = new BoardPromotion();

		// 게시판 수정시
    	if(boardDto.getBoardNum()!=null) {
    		
    		// 기존 게시판 불러오기
    		bp = BPRepo.findByBoardNumAndMemId(
				boardDto.getBoardNum(),
				boardDto.getMemId()
			);

    		// 기존 날짜와 리뷰, 좋아요 수 지정
    		bp.setDate(boardDto.getDate());
        	
        	Long _review=boardDto.getReview();
        	Long _likeCnt=boardDto.getLikeCnt();
        	
        	bp.setReview(_review != null ? _review : 0);
        	bp.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}

    	// 작성자, 제목, 내용 지정
		bp.setMemId(boardDto.getMemId());
		bp.setTitle(boardDto.getTitle());
		bp.setContent(boardDto.getContent());
    	
    	return BPRepo.save(bp).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 게시판 삭제
	@Transactional
    public void deletePromotion(Long boardNum) { BPRepo.deleteById(boardNum); }

    // 소유자 확인
    public boolean isOwnerPromotion(Long boardNum, String memId) {
    	return BPRepo.existsByBoardNumAndMemId(boardNum, memId);
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒BoardEvent▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 페이지마다 날짜 기준 내림차순으로 가져오기
    public List<BoardEvent> getEventByPage(Pageable pageable) {
		return BERepo.findAllByOrderByDateDesc(pageable).getContent();
    }

    // 저장된 게시판 갯수
    public long getPromotionCnt() { return BERepo.count(); }

    // 게시판 상세 정보 가져오기
    // 이때 리뷰수를 1만큼 증가시킨다
    public BoardEvent getEventDetail(Long bNum) {
    	BoardEvent b = BERepo.findByBoardNum(bNum);
    	b.setReview(b.getReview()+1);
    	BERepo.save(b);
		return b;
    }

    // 게시판 좋아요 추가
    public void addEventLike(Long bNum) {
    	BoardEvent b = BERepo.findByBoardNum(bNum);
    	b.setLikeCnt(b.getLikeCnt()+1);
    	BERepo.save(b);
		return;
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setEventDetail(BoardDto boardDto) {
    	
    	BoardEvent be = new BoardEvent();

		// 게시판 수정시
    	if(boardDto.getBoardNum()!=null) {
    		
    		// 기존 게시판 불러오기
    		be = BERepo.findByBoardNumAndMemId(
				boardDto.getBoardNum(),
				boardDto.getMemId()
			);

    		// 기존 날짜와 리뷰, 좋아요 수 지정
        	be.setDate(boardDto.getDate());
        	
        	Long _review=boardDto.getReview();
        	Long _likeCnt=boardDto.getLikeCnt();
        	
        	be.setReview(_review != null ? _review : 0);
        	be.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}

    	// 작성자, 제목, 내용 지정
		be.setMemId(boardDto.getMemId());
    	be.setTitle(boardDto.getTitle());
    	be.setContent(boardDto.getContent());
    	
    	return BERepo.save(be).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 게시판 삭제
	@Transactional
    public void deleteEvent(Long boardNum) { BERepo.deleteById(boardNum); }

    // 소유자 확인
    public boolean isOwnerEvent(Long boardNum, String memId) {
    	return BERepo.existsByBoardNumAndMemId(boardNum, memId);
    }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒Board QA▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

    // 페이지마다 날짜 기준 내림차순으로 가져오기
    public List<BoardQA> getQAByPage(Pageable pageable) {
		return BQARepo.findAllByOrderByDateDesc(pageable).getContent();
    }

    // 저장된 게시판 갯수
    public long getQACnt() { return BQARepo.count(); }

    // 게시판 상세 정보 가져오기
    // 이때 리뷰수를 1만큼 증가시킨다
    public BoardQA getQADetail(Long bNum) {
    	BoardQA b = BQARepo.findByBoardNum(bNum);
    	b.setReview(b.getReview()+1);
    	BQARepo.save(b);
		return b;
    }

    // 게시판 좋아요 추가
    public void addQALike(Long bNum) {
    	BoardQA b = BQARepo.findByBoardNum(bNum);
    	b.setLikeCnt(b.getLikeCnt()+1);
    	BQARepo.save(b);
		return;
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setQADetail(BoardDto boardDto) {
    	
    	BoardQA bQA = new BoardQA();

		// 게시판 수정시
    	if(boardDto.getBoardNum()!=null) {
    		
    		// 기존 게시판 불러오기
    		bQA = BQARepo.findByBoardNumAndMemId(
				boardDto.getBoardNum(),
				boardDto.getMemId()
			);

    		// 기존 날짜와 리뷰, 좋아요 수 지정
        	bQA.setDate(boardDto.getDate());
        	
        	Long _review=boardDto.getReview();
        	Long _likeCnt=boardDto.getLikeCnt();
        	
        	bQA.setReview(_review != null ? _review : 0);
        	bQA.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}

    	// 작성자, 제목, 내용 지정
		bQA.setMemId(boardDto.getMemId());
    	bQA.setTitle(boardDto.getTitle());
    	bQA.setContent(boardDto.getContent());

    	// 게시판 비공개 여부 지정
    	bQA.setPrivated(boardDto.getPrivated());
    	
    	return BQARepo.save(bQA).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 게시판 삭제
	@Transactional
    public void deleteQA(Long boardNum) { BQARepo.deleteById(boardNum); }

    // 소유자 확인
    public boolean isOwnerQA(Long boardNum, String memId) {
    	return BQARepo.existsByBoardNumAndMemId(boardNum, memId);
    }
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
}
