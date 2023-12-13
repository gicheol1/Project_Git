package com.project.festival.Controller.orther;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.project.festival.Entity.board.CommentDetail;
import com.project.festival.Entity.board.Comm.CommentEvent;
import com.project.festival.Entity.board.Comm.CommentFree;
import com.project.festival.Entity.board.Comm.CommentNotic;
import com.project.festival.Entity.board.Comm.CommentPromotion;
import com.project.festival.Entity.board.Comm.CommentQA;

@Component
public class ConversionComment {
	
	public List<CommentDetail> returnFree(List<CommentFree> c) {
		
		List<CommentDetail> commList = new ArrayList<>();
		
		for(CommentFree cFree : c) {
			CommentDetail commDetail = new CommentDetail();
			
			commDetail.setCoNum(cFree.getCoNum());
//			commDetail.setRecoNum(cFree.getRecoNum());
			commDetail.setMemId(cFree.getMemId());
//			commDetail.setBoardNum(cFree.getBoardNum());
			commDetail.setContent(cFree.getContent());
			
			commList.add(commDetail);
		}
		
		return commList;
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<CommentDetail> returnNotic(List<CommentNotic> c) {
		
		List<CommentDetail> commList = new ArrayList<>();
		
		for(CommentNotic cNotic : c) {
			CommentDetail commDetail = new CommentDetail();
			
			commDetail.setCoNum(cNotic.getCoNum());
//			commDetail.setRecoNum(cNotic.getRecoNum());
			commDetail.setMemId(cNotic.getMemId());
//			commDetail.setBoardNum(cNotic.getBoardNum());
			commDetail.setContent(cNotic.getContent());
			
			commList.add(commDetail);
		}
		
		return commList;
	}
	
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
		
	public List<CommentDetail> returnPromotion(List<CommentPromotion> c) {
		
		List<CommentDetail> commList = new ArrayList<>();
		
		for(CommentPromotion cPromotion : c) {
			CommentDetail commDetail = new CommentDetail();
			
			commDetail.setCoNum(cPromotion.getCoNum());
//			commDetail.setRecoNum(cPromotion.getRecoNum());
			commDetail.setMemId(cPromotion.getMemId());
//			commDetail.setBoardNum(cPromotion.getBoardNum());
			commDetail.setContent(cPromotion.getContent());
			
			commList.add(commDetail);
		}
		
		return commList;
	}
	
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
		
	public List<CommentDetail> returnEvent(List<CommentEvent> c) {
		
		List<CommentDetail> commList = new ArrayList<>();
		
		for(CommentEvent cEvent : c) {
			CommentDetail commDetail = new CommentDetail();
			
			commDetail.setCoNum(cEvent.getCoNum());
//			commDetail.setRecoNum(cEvent.getRecoNum());
			commDetail.setMemId(cEvent.getMemId());
//			commDetail.setBoardNum(cEvent.getBoardNum());
			commDetail.setContent(cEvent.getContent());
			
			commList.add(commDetail);
		}
		
		return commList;
	}
	
	// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
		
	public List<CommentDetail> returnQA(List<CommentQA> c) {
		
		List<CommentDetail> commList = new ArrayList<>();
		
		for(CommentQA cQA : c) {
			CommentDetail commDetail = new CommentDetail();
			
			commDetail.setCoNum(cQA.getCoNum());
//			commDetail.setRecoNum(cQA.getRecoNum());
			commDetail.setMemId(cQA.getMemId());
//			commDetail.setBoardNum(cQA.getBoardNum());
			commDetail.setContent(cQA.getContent());
			
			commList.add(commDetail);
		}
		
		return commList;
	}

}
