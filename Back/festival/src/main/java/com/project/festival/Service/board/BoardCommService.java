package com.project.festival.Service.board;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.board.CommentDto;
import com.project.festival.Entity.board.Comm.CommentEvent;
import com.project.festival.Entity.board.Comm.CommentFree;
import com.project.festival.Entity.board.Comm.CommentPromotion;
import com.project.festival.Entity.board.Comm.CommentQA;
import com.project.festival.Entity.board.RepositoryComm.CommentEventRepo;
import com.project.festival.Entity.board.RepositoryComm.CommentFreeRepo;
import com.project.festival.Entity.board.RepositoryComm.CommentPromotionRepo;
import com.project.festival.Entity.board.RepositoryComm.CommentQARepo;

@Service
public class BoardCommService {
	
	@Autowired
	private CommentFreeRepo commFreeRepo;
	
	@Autowired
	private CommentPromotionRepo commNoticRepo;
	
	@Autowired
	private CommentPromotionRepo commPromotionRepo;
	
	@Autowired
	private CommentEventRepo commEventRepo;
	
	@Autowired
	private CommentQARepo commQARepo;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentFree> getCommentsFree(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentFree> commFree = commFreeRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commFree==null || commFree.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 댓글
        List<CommentFree> comm = new ArrayList<>();
        
    	for (CommentFree c : commFree) {
    		comm.add(c);

    		List<CommentFree> commTemp = new ArrayList<>();
    		commTemp = getReCommentFree(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentFree> getReCommentFree(Long boardNum, Long recoNum) {
		
		// 저장된 답글들
        List<CommentFree> reComm = commFreeRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);

        // 댓글이 없는 경우
        if(reComm==null || reComm.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 답글
        List<CommentFree> comm = new ArrayList<>();
        
    	for (CommentFree c : reComm) {
    		comm.add(c);
    		
    		// 더이상 답글이 없는 경우 건너뛰기
    		if(c.getRecoNum()!=null) { continue; }

    		List<CommentFree> commTemp = new ArrayList<>();
    		commTemp = getReCommentFree(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	public void setFree(CommentDto comm) {
		
		CommentFree commFree = new CommentFree();
		
		commFree.setCoNum(comm.getCoNum());
		commFree.setRecoNum(comm.getRecoNum());
		commFree.setMemId(comm.getMemId());
		commFree.setBoardNum(comm.getBoardNum());
		commFree.setContent(comm.getContent());
		
		commFreeRepo.save(commFree);
		
	}
	
	public void deleteCommFreeByCoNum(Long boardNum, Long CoNum) {
		commFreeRepo.deleteByBoardNumAndCoNum(boardNum, CoNum);
	}
	
	public void deleteAllCommFree(Long boardNum) {
		commFreeRepo.deleteByBoardNum(boardNum);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentPromotion> getCommentsNotic(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentPromotion> commFree = commNoticRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commFree==null || commFree.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 댓글
        List<CommentPromotion> comm = new ArrayList<>();
        
    	for (CommentPromotion c : commFree) {
    		comm.add(c);

    		List<CommentPromotion> commTemp = new ArrayList<>();
    		commTemp = getReCommentPromotion(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentPromotion> getReCommentNotic(Long boardNum, Long recoNum) {
		
		// 저장된 답글들
        List<CommentPromotion> reComm = commNoticRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);

        // 댓글이 없는 경우
        if(reComm==null || reComm.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 답글
        List<CommentPromotion> comm = new ArrayList<>();
        
    	for (CommentPromotion c : reComm) {
    		comm.add(c);
    		
    		// 더이상 답글이 없는 경우 건너뛰기
    		if(c.getRecoNum()!=null) { continue; }

    		List<CommentPromotion> commTemp = new ArrayList<>();
    		commTemp = getReCommentPromotion(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	public void setNotic(CommentDto comm) {
		
		CommentPromotion commNotic = new CommentPromotion();
		
		commNotic.setCoNum(comm.getCoNum());
		commNotic.setRecoNum(comm.getRecoNum());
		commNotic.setMemId(comm.getMemId());
		commNotic.setBoardNum(comm.getBoardNum());
		commNotic.setContent(comm.getContent());
		
		commNoticRepo.save(commNotic);
		
	}
	
	public void deleteCommNoticByCoNum(Long boardNum, Long CoNum) {
		commNoticRepo.deleteByBoardNumAndCoNum(boardNum, CoNum);
	}
	
	public void deleteAllCommNotic(Long boardNum) {
		commNoticRepo.deleteByBoardNum(boardNum);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentPromotion> getCommentsPromotion(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentPromotion> commFree = commPromotionRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commFree==null || commFree.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 댓글
        List<CommentPromotion> comm = new ArrayList<>();
        
    	for (CommentPromotion c : commFree) {
    		comm.add(c);

    		List<CommentPromotion> commTemp = new ArrayList<>();
    		commTemp = getReCommentPromotion(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentPromotion> getReCommentPromotion(Long boardNum, Long recoNum) {
		
		// 저장된 답글들
        List<CommentPromotion> reComm = commPromotionRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);

        // 댓글이 없는 경우
        if(reComm==null || reComm.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 답글
        List<CommentPromotion> comm = new ArrayList<>();
        
    	for (CommentPromotion c : reComm) {
    		comm.add(c);
    		
    		// 더이상 답글이 없는 경우 건너뛰기
    		if(c.getRecoNum()!=null) { continue; }

    		List<CommentPromotion> commTemp = new ArrayList<>();
    		commTemp = getReCommentPromotion(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	public void setPromotion(CommentDto comm) {
		
		CommentPromotion commPromotion = new CommentPromotion();
		
		commPromotion.setCoNum(comm.getCoNum());
		commPromotion.setRecoNum(comm.getRecoNum());
		commPromotion.setMemId(comm.getMemId());
		commPromotion.setBoardNum(comm.getBoardNum());
		commPromotion.setContent(comm.getContent());
		
		commPromotionRepo.save(commPromotion);
		
	}
	
	public void deleteCommPromotionByCoNum(Long boardNum, Long CoNum) {
		commPromotionRepo.deleteByBoardNumAndCoNum(boardNum, CoNum);
	}
	
	public void deleteAllCommPromotion(Long boardNum) {
		commPromotionRepo.deleteByBoardNum(boardNum);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentEvent> getCommentsEvent(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentEvent> commFree = commEventRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commFree==null || commFree.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 댓글
        List<CommentEvent> comm = new ArrayList<>();
        
    	for (CommentEvent c : commFree) {
    		comm.add(c);

    		List<CommentEvent> commTemp = new ArrayList<>();
    		commTemp = getReCommentEvnet(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentEvent> getReCommentEvnet(Long boardNum, Long recoNum) {
		
		// 저장된 답글들
        List<CommentEvent> reComm = commEventRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);

        // 댓글이 없는 경우
        if(reComm==null || reComm.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 답글
        List<CommentEvent> comm = new ArrayList<>();
        
    	for (CommentEvent c : reComm) {
    		comm.add(c);
    		
    		// 더이상 답글이 없는 경우 건너뛰기
    		if(c.getRecoNum()!=null) { continue; }

    		List<CommentEvent> commTemp = new ArrayList<>();
    		commTemp = getReCommentEvnet(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	public void setEvent(CommentDto comm) {
		
		CommentEvent commEvent = new CommentEvent();
		
		commEvent.setCoNum(comm.getCoNum());
		commEvent.setRecoNum(comm.getRecoNum());
		commEvent.setMemId(comm.getMemId());
		commEvent.setBoardNum(comm.getBoardNum());
		commEvent.setContent(comm.getContent());
		
		commEventRepo.save(commEvent);
		
	}
	
	public void deleteCommEventByCoNum(Long boardNum, Long CoNum) {
		commEventRepo.deleteByBoardNumAndCoNum(boardNum, CoNum);
	}
	
	public void deleteAllCommEvent(Long boardNum) {
		commEventRepo.deleteByBoardNum(boardNum);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentQA> getCommentsQA(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentQA> commFree = commQARepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commFree==null || commFree.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 댓글
        List<CommentQA> comm = new ArrayList<>();
        
    	for (CommentQA c : commFree) {
    		comm.add(c);

    		List<CommentQA> commTemp = new ArrayList<>();
    		commTemp = getReCommentQA(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentQA> getReCommentQA(Long boardNum, Long recoNum) {
		
		// 저장된 답글들
        List<CommentQA> reComm = commQARepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);

        // 댓글이 없는 경우
        if(reComm==null || reComm.size()==0) {
        	return null;
        }
        
        // 계층 정렬된 답글
        List<CommentQA> comm = new ArrayList<>();
        
    	for (CommentQA c : reComm) {
    		comm.add(c);
    		
    		// 더이상 답글이 없는 경우 건너뛰기
    		if(c.getRecoNum()!=null) { continue; }

    		List<CommentQA> commTemp = new ArrayList<>();
    		commTemp = getReCommentQA(boardNum, c.getCoNum());
    		if(commTemp!=null && !commTemp.isEmpty()) {
    			// 해당 댓글 번호에 답글을 한 댓글을 추가
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	public void setQA(CommentDto comm) {
		
		CommentQA commQA = new CommentQA();
		
		commQA.setCoNum(comm.getCoNum());
		commQA.setRecoNum(comm.getRecoNum());
		commQA.setMemId(comm.getMemId());
		commQA.setBoardNum(comm.getBoardNum());
		commQA.setContent(comm.getContent());
		
		commQARepo.save(commQA);
		
	}
	
	public void deleteCommQAByCoNum(Long boardNum, Long CoNum) {
		commQARepo.deleteByBoardNumAndCoNum(boardNum, CoNum);
	}
	
	public void deleteAllCommQA(Long boardNum) {
		commQARepo.deleteByBoardNum(boardNum);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
}
