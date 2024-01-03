package com.project.festival.Service.board;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Entity.board.CommentDto;
import com.project.festival.Entity.board.Comm.CommentEvent;
import com.project.festival.Entity.board.Comm.CommentFree;
import com.project.festival.Entity.board.Comm.CommentNotic;
import com.project.festival.Entity.board.Comm.CommentPromotion;
import com.project.festival.Entity.board.Comm.CommentQA;
import com.project.festival.Entity.board.RepositoryComm.CommentEventRepo;
import com.project.festival.Entity.board.RepositoryComm.CommentFreeRepo;
import com.project.festival.Entity.board.RepositoryComm.CommentNoticRepo;
import com.project.festival.Entity.board.RepositoryComm.CommentPromotionRepo;
import com.project.festival.Entity.board.RepositoryComm.CommentQARepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardCommService {
	
	private final CommentFreeRepo commFreeRepo;
	private final CommentNoticRepo commNoticRepo;
	private final CommentPromotionRepo commPromotionRepo;
	private final CommentEventRepo commEventRepo;
	private final CommentQARepo commQARepo;
	
	private final ModelMapper modelMapper;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentDto> getCommentsFree(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentFree> commFree = commFreeRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commFree==null || commFree.size()==0) { return null; }
        
        // 계층 정렬된 댓글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentFree c : commFree) {
    		
    		// 표시할 댓글을 맨 앞에 추가
    		comm.add(modelMapper.map(c, CommentDto.class));

    		// 답글을 받아올 리스트
    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentFree(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentDto> getReCommentFree(Long boardNum, Long recoNum, String memId) {
		
		// 저장된 답글들
        List<CommentFree> reComm = commFreeRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);
        
        // 계층 정렬된 답글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentFree c : reComm) {
    		
    		CommentDto dto = modelMapper.map(c, CommentDto.class);
    		
    		// 답글 대상의 이름 추가
    		dto.setRecoMemId(memId);
    		comm.add(dto);

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentFree(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	/* ========== ========== ========== ========== ========== ========== ========== */
	
	// 댓글 소유 확인
	public boolean isOwnerCommentFree(Long boardNum, Long coNum, String memId) {
		return commFreeRepo.existsByBoardNumAndCoNumAndMemId(boardNum, coNum, memId);
	}
	
	// 댓글 추가, 수정
	public void addFree(CommentDto comm) {
		CommentFree commFree = modelMapper.map(comm, CommentFree.class);
		commFreeRepo.save(commFree);
	}
	
	// 댓글 삭제
	@Transactional
	public void deleteCommFreeByCoNum(Long boardNum, Long CoNum) {
		CommentFree commFree = commFreeRepo.findById(CoNum).get();
		commFree.setDeleted(true);
		commFreeRepo.save(commFree);
	}

	@Transactional
	public void deleteAllCommFree(Long boardNum) {commFreeRepo.deleteByBoardNum(boardNum);}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentDto> getCommentsNotic(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentNotic> commNotic = commNoticRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commNotic==null || commNotic.size()==0) { return null; }
        
        // 계층 정렬된 댓글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentNotic c : commNotic) {
    		comm.add(modelMapper.map(c, CommentDto.class));

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentNotic(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentDto> getReCommentNotic(Long boardNum, Long recoNum, String memId) {
		
		// 저장된 답글들
        List<CommentNotic> reComm = commNoticRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);
        
        // 계층 정렬된 답글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentNotic c : reComm) {
    		
    		CommentDto dto = modelMapper.map(c, CommentDto.class);
    		
    		// 답글 대상의 이름 추가
    		dto.setRecoMemId(memId);
    		comm.add(dto);

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentNotic(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	/* ========== ========== ========== ========== ========== ========== ========== */
	
	// 댓글 소유 확인
	public boolean isOwnerCommentNotic(Long boardNum, Long coNum, String memId) {
		return commNoticRepo.existsByBoardNumAndCoNumAndMemId(boardNum, coNum, memId);
	}
	
	public void addNotic(CommentDto comm) {
		CommentNotic commNotic = modelMapper.map(comm, CommentNotic.class);
		commNoticRepo.save(commNotic);
	}

	@Transactional
	public void deleteCommNoticByCoNum(Long boardNum, Long CoNum) {
		CommentNotic commNotic = commNoticRepo.findById(CoNum).get();
		commNotic.setDeleted(true);
		commNoticRepo.save(commNotic);
	}

	@Transactional
	public void deleteAllCommNotic(Long boardNum) {commNoticRepo.deleteByBoardNum(boardNum);}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentDto> getCommentsPromotion(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentPromotion> commPromotion = commPromotionRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commPromotion==null || commPromotion.size()==0) { return null; }
        
        // 계층 정렬된 댓글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentPromotion c : commPromotion) {
    		comm.add(modelMapper.map(c, CommentDto.class));

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentPromotion(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentDto> getReCommentPromotion(Long boardNum, Long recoNum, String memId) {
		
		// 저장된 답글들
        List<CommentPromotion> reComm = commPromotionRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);
        
        // 계층 정렬된 답글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentPromotion c : reComm) {
    		
    		CommentDto dto = modelMapper.map(c, CommentDto.class);
    		
    		// 답글 대상의 이름 추가
    		dto.setRecoMemId(memId);
    		comm.add(dto);

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentPromotion(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	/* ========== ========== ========== ========== ========== ========== ========== */
	
	// 댓글 소유 확인
	public boolean isOwnerCommentPromotion(Long boardNum, Long coNum, String memId) {
		return commPromotionRepo.existsByBoardNumAndCoNumAndMemId(boardNum, coNum, memId);
	}
	
	public void addPromotion(CommentDto comm) {
		
		CommentPromotion commPromotion = modelMapper.map(comm, CommentPromotion.class);
		commPromotionRepo.save(commPromotion);
		
	}

	@Transactional
	public void deleteCommPromotionByCoNum(Long boardNum, Long CoNum) {
		CommentPromotion commPromotion = commPromotionRepo.findById(CoNum).get();
		commPromotion.setDeleted(true);
		commPromotionRepo.save(commPromotion);
	}

	@Transactional
	public void deleteAllCommPromotion(Long boardNum) {commPromotionRepo.deleteByBoardNum(boardNum);}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentDto> getCommentsEvent(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentEvent> commEvent = commEventRepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commEvent==null || commEvent.size()==0) { return null; }
        
        // 계층 정렬된 댓글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentEvent c : commEvent) {
    		comm.add(modelMapper.map(c, CommentDto.class));

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentEvent(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentDto> getReCommentEvent(Long boardNum, Long recoNum, String memId) {
		
		// 저장된 답글들
        List<CommentEvent> reComm = commEventRepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);
        
        // 계층 정렬된 답글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentEvent c : reComm) {
    		
    		CommentDto dto = modelMapper.map(c, CommentDto.class);
    		
    		// 답글 대상의 이름 추가
    		dto.setRecoMemId(memId);
    		comm.add(dto);

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentEvent(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	/* ========== ========== ========== ========== ========== ========== ========== */
	
	// 댓글 소유 확인
	public boolean isOwnerCommentEvent(Long boardNum, Long coNum, String memId) {
		return commEventRepo.existsByBoardNumAndCoNumAndMemId(boardNum, coNum, memId);
	}
	
	public void addEvent(CommentDto comm) {
		CommentEvent commEvent = modelMapper.map(comm, CommentEvent.class);
		commEventRepo.save(commEvent);
	}

	@Transactional
	public void deleteCommEventByCoNum(Long boardNum, Long CoNum) {
		CommentEvent commEvent = commEventRepo.findById(CoNum).get();
		commEvent.setDeleted(true);
		commEventRepo.save(commEvent);
	}

	@Transactional
	public void deleteAllCommEvent(Long boardNum) {commEventRepo.deleteByBoardNum(boardNum);}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	// 댓글 출력
	public List<CommentDto> getCommentsQA(Long boardNum) {
		
		// 저장된 댓글들
        List<CommentQA> commQA = commQARepo.findByBoardNumAndRecoNumIsNullOrderByCoNum(boardNum);

        // 댓글이 없는 경우
        if(commQA==null || commQA.size()==0) { return null; }
        
        // 계층 정렬된 댓글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentQA c : commQA) {
    		comm.add(modelMapper.map(c, CommentDto.class));

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentQA(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	// 답글 붙여넣기
	public List<CommentDto> getReCommentQA(Long boardNum, Long recoNum, String memId) {
		
		// 저장된 답글들
        List<CommentQA> reComm = commQARepo.findByBoardNumAndRecoNumOrderByCoNum(boardNum, recoNum);
        
        // 계층 정렬된 답글
        List<CommentDto> comm = new ArrayList<>();
        
    	for (CommentQA c : reComm) {
    		
    		CommentDto dto = modelMapper.map(c, CommentDto.class);
    		
    		// 답글 대상의 이름 추가
    		dto.setRecoMemId(memId);
    		comm.add(dto);

    		List<CommentDto> commTemp = new ArrayList<>();
    		commTemp = getReCommentQA(boardNum, c.getCoNum(), c.getMemId());
    		
    		if(commTemp!=null && !commTemp.isEmpty()) {
                comm.addAll(commTemp);
    		}
        }
        return comm;
    }
	
	/* ========== ========== ========== ========== ========== ========== ========== */
	
	// 댓글 소유 확인
	public boolean isOwnerCommentQA(Long boardNum, Long coNum, String memId) {
		return commQARepo.existsByBoardNumAndCoNumAndMemId(boardNum, coNum, memId);
	}
	
	public void addQA(CommentDto comm) {
		
		CommentQA commQA = modelMapper.map(comm, CommentQA.class);
		commQARepo.save(commQA);
		
	}

	@Transactional
	public void deleteCommQAByCoNum(Long boardNum, Long CoNum) {
		CommentQA commQA = commQARepo.findById(CoNum).get();
		commQA.setDeleted(true);
		commQARepo.save(commQA);
	}

	@Transactional
	public void deleteAllCommQA(Long boardNum) {commQARepo.deleteByBoardNum(boardNum);}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
}
