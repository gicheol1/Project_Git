package com.project.festival.Controller.orther;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.project.festival.Entity.board.BoardDetail;
import com.project.festival.Entity.board.Entity.BoardEvent;
import com.project.festival.Entity.board.Entity.BoardFree;
import com.project.festival.Entity.board.Entity.BoardNotic;
import com.project.festival.Entity.board.Entity.BoardPromotion;
import com.project.festival.Entity.board.Entity.BoardQA;

@Component
public class ConversionBoard {
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<BoardDetail> returnFree(List<BoardFree> b) {
		
		List<BoardDetail> detailList = new ArrayList<>();
		
		for(BoardFree bFree : b) {
			BoardDetail bDetail = new BoardDetail();
			
			bDetail.setBoardNum(bFree.getBoardNum());
			bDetail.setMemId(bFree.getMemId());
			bDetail.setTitle(bFree.getTitle());
			bDetail.setDate(bFree.getDate());
			bDetail.setReview(bFree.getReview());
			
			detailList.add(bDetail);
		}
		
		return detailList;
	}
	
	public BoardFree intoFree(BoardDetail detail) {
		
		BoardFree bFree = new BoardFree();
		
		bFree.setTitle(detail.getTitle());
		bFree.setDate(detail.getDate());
		
		return bFree;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public List<BoardDetail> returnNotic(List<BoardNotic> b) {
		
		List<BoardDetail> detailList = new ArrayList<>();
		
		for(BoardNotic bNotic : b) {
			BoardDetail bDetail = new BoardDetail();
			
			bDetail.setBoardNum(bNotic.getBoardNum());
			bDetail.setMemId(bNotic.getMemId());
			bDetail.setTitle(bNotic.getTitle());
			bDetail.setDate(bNotic.getDate());
			bDetail.setReview(bNotic.getReview());
			
			detailList.add(bDetail);
		}
		
		return detailList;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public List<BoardDetail> returnPromotion(List<BoardPromotion> b) {
		
		List<BoardDetail> detailList = new ArrayList<>();
		
		for(BoardPromotion bPromotion : b) {
			BoardDetail bDetail = new BoardDetail();
			
			bDetail.setBoardNum(bPromotion.getBoardNum());
			bDetail.setMemId(bPromotion.getMemId());
			bDetail.setTitle(bPromotion.getTitle());
			bDetail.setDate(bPromotion.getDate());
			bDetail.setReview(bPromotion.getReview());
			
			detailList.add(bDetail);
		}
		
		return detailList;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public List<BoardDetail> returnEvent(List<BoardEvent> b) {
		
		List<BoardDetail> detailList = new ArrayList<>();
		
		for(BoardEvent bEvent : b) {
			BoardDetail bDetail = new BoardDetail();
			
			bDetail.setBoardNum(bEvent.getBoardNum());
			bDetail.setMemId(bEvent.getMemId());
			bDetail.setTitle(bEvent.getTitle());
			bDetail.setDate(bEvent.getDate());
			bDetail.setReview(bEvent.getReview());
			
			detailList.add(bDetail);
		}
		
		return detailList;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public List<BoardDetail> returnQA(List<BoardQA> b) {
		
		List<BoardDetail> detailList = new ArrayList<>();
		
		for(BoardQA bQA : b) {
			BoardDetail bDetail = new BoardDetail();
			
			bDetail.setBoardNum(bQA.getBoardNum());
			bDetail.setMemId(bQA.getMemId());
			bDetail.setTitle(bQA.getTitle());
			bDetail.setDate(bQA.getDate());
			bDetail.setReview(bQA.getReview());
			bDetail.setPrivated(bQA.getPrivated());
			
			detailList.add(bDetail);
		}
		
		return detailList;
	}
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒ 단일 출력 ▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public BoardDetail returnFree(BoardFree b) {
		
		BoardDetail bDetail = new BoardDetail();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDetail returnNotic(BoardNotic b) {
		
		BoardDetail bDetail = new BoardDetail();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDetail returnPromotion(BoardPromotion b) {
		
		BoardDetail bDetail = new BoardDetail();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDetail returnEvent(BoardEvent b) {
		
		BoardDetail bDetail = new BoardDetail();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDetail returnQA(BoardQA b) {
		
		BoardDetail bDetail = new BoardDetail();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		bDetail.setPrivated(b.getPrivated());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

}
