package com.project.festival.Service.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.Repo.UserRepo;
import com.project.festival.Entity.board.BoardDetail;
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

	@Autowired
	private UserRepo userRepo;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    public List<BoardFree> getFreeByPage(Pageable pageable) {
		return BFRepo.findAllByOrderByDateDesc(pageable).getContent();
    }
    
    public long getFreeCnt() { return BFRepo.count(); }
    
    public BoardFree getFreeDetail(Long bNum) {
		return BFRepo.findByBoardNum(bNum);
    }
    
    // 게시판 생성, 수정
    public Long setFreeDetail(BoardDetail boardDetail) {
    	
    	BoardFree bf = new BoardFree();
    	
		// 게시판 수정시
    	if(boardDetail.getBoardNum()!=null) {
    		bf = BFRepo.findByBoardNumAndMemId(
				boardDetail.getBoardNum(),
				boardDetail.getMemId()
			);
    		
    		bf.setDate(boardDetail.getDate());
        	
        	Long _review = boardDetail.getReview();
        	Long _likeCnt = boardDetail.getLikeCnt();
        	
        	bf.setReview(_review != null ? _review : 0);
        	bf.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}
    	
		bf.setMemId(boardDetail.getMemId());
    	bf.setTitle(boardDetail.getTitle());
    	bf.setContent(boardDetail.getContent());
    	
    	return BFRepo.save(bf).getBoardNum();
		
    }
    
    // 게시판 삭제
    public void deleteFree(Long boardNum) {
    	BFRepo.deleteById(boardNum);
    }
    
    // 소유자 확인
    public boolean isOwnerFree(Long boardNum, String memId) {
    	return BFRepo.existsByBoardNumAndMemId(boardNum, memId);
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     
    public List<BoardNotic> getNoticByPage(Pageable pageable) {
		return BNRepo.findAllByOrderByDateDesc(pageable).getContent();
    }
    
    public long getNoticCnt() { return BNRepo.count(); }
    
    public BoardNotic getNoticDetail(Long bNum) {
		return BNRepo.findByBoardNum(bNum);
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setNoticDetail(BoardDetail boardDetail) {
    	
    	BoardNotic bn = new BoardNotic();
    	
    	if(boardDetail.getBoardNum()!=null) {
    		bn = BNRepo.findByBoardNumAndMemId(
				boardDetail.getBoardNum(),
				boardDetail.getMemId()
    		);
        	
    		bn.setDate(boardDetail.getDate());
        	
        	Long _review=boardDetail.getReview();
        	Long _likeCnt=boardDetail.getLikeCnt();
        	
        	bn.setReview(_review != null ? _review : 0);
        	bn.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}
    	
		bn.setTitle(boardDetail.getTitle());
		bn.setContent(boardDetail.getContent());
    	
    	return BNRepo.save(bn).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public void deleteNotic(Long boardNum) {
    	BNRepo.deleteById(boardNum);
    }
    
    public boolean isOwnerNotic(Long boardNum, String memId) {
    	return BNRepo.existsByBoardNumAndMemId(boardNum, memId);
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     
    public List<BoardPromotion> getPromotionByPage(Pageable pageable) {
		return BPRepo.findAllByOrderByDateDesc(pageable).getContent();
    }
    
    public long getEventCnt() { return BPRepo.count(); }
    
    public BoardPromotion getPromotionDetail(Long bNum) {
		return BPRepo.findByBoardNum(bNum);
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setPromotionDetail(BoardDetail boardDetail) {
    	
    	BoardPromotion bp = new BoardPromotion();
    	
    	if(boardDetail.getBoardNum()!=null) {
    		bp = BPRepo.findByBoardNumAndMemId(
				boardDetail.getBoardNum(),
				boardDetail.getMemId()
			);

    		bp.setDate(boardDetail.getDate());
        	
        	Long _review=boardDetail.getReview();
        	Long _likeCnt=boardDetail.getLikeCnt();
        	
        	bp.setReview(_review != null ? _review : 0);
        	bp.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}
    	
		bp.setTitle(boardDetail.getTitle());
		bp.setContent(boardDetail.getContent());
    	
    	return BPRepo.save(bp).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public void deletePromotion(Long boardNum) {
    	BPRepo.deleteById(boardNum);
    }
    
    public boolean isOwnerPromotion(Long boardNum, String memId) {
    	return BPRepo.existsByBoardNumAndMemId(boardNum, memId);
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
     
    public List<BoardEvent> getEventByPage(Pageable pageable) {
		return BERepo.findAllByOrderByDateDesc(pageable).getContent();
    }
    
    public long getPromotionCnt() { return BERepo.count(); }
    
    public BoardEvent getEventDetail(Long bNum) {
		return BERepo.findByBoardNum(bNum);
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setEventDetail(BoardDetail boardDetail) {
    	
    	BoardEvent be = new BoardEvent();
    	
    	if(boardDetail.getBoardNum()!=null) {
    		be = BERepo.findByBoardNumAndMemId(
				boardDetail.getBoardNum(),
				boardDetail.getMemId()
			);

        	be.setDate(boardDetail.getDate());
        	
        	Long _review=boardDetail.getReview();
        	Long _likeCnt=boardDetail.getLikeCnt();
        	
        	be.setReview(_review != null ? _review : 0);
        	be.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}
    	
    	be.setTitle(boardDetail.getTitle());
    	be.setContent(boardDetail.getContent());
    	
    	return BERepo.save(be).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public void deleteEvent(Long boardNum) {
    	BERepo.deleteById(boardNum);
    }
    
    public boolean isOwnerEvent(Long boardNum, String memId) {
    	return BERepo.existsByBoardNumAndMemId(boardNum, memId);
    }
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
    public List<BoardQA> getQAByPage(Pageable pageable) {
		return BQARepo.findAllByOrderByDateDesc(pageable).getContent();
    }
    
    public long getQACnt() { return BQARepo.count(); }
    
    public BoardQA getQADetail(Long bNum) {
		return BQARepo.findByBoardNum(bNum);
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public long setQADetail(BoardDetail boardDetail) {
    	
    	BoardQA bQA = new BoardQA();
    	
    	if(boardDetail.getBoardNum()!=null) {
    		bQA = BQARepo.findByBoardNumAndMemId(
				boardDetail.getBoardNum(),
				boardDetail.getMemId()
			);

        	bQA.setDate(boardDetail.getDate());
        	
        	Long _review=boardDetail.getReview();
        	Long _likeCnt=boardDetail.getLikeCnt();
        	
        	bQA.setReview(_review != null ? _review : 0);
        	bQA.setLikeCnt(_likeCnt != null ? _likeCnt : 0);
    	}
    	
    	bQA.setTitle(boardDetail.getTitle());
    	bQA.setContent(boardDetail.getContent());
    	
    	bQA.setPrivated(boardDetail.getPrivated());
    	
    	return BQARepo.save(bQA).getBoardNum();
		
    }
    
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
    
    public void deleteQA(Long boardNum) {
    	BQARepo.deleteById(boardNum);
    }
    
    public boolean isOwnerQA(Long boardNum, String memId) {
    	return BQARepo.existsByBoardNumAndMemId(boardNum, memId);
    }
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    
}
