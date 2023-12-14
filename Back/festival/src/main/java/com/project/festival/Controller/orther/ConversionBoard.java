package com.project.festival.Controller.orther;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.project.festival.Entity.board.BoardDto;
import com.project.festival.Entity.board.Entity.BoardEvent;
import com.project.festival.Entity.board.Entity.BoardFree;
import com.project.festival.Entity.board.Entity.BoardNotic;
import com.project.festival.Entity.board.Entity.BoardPromotion;
import com.project.festival.Entity.board.Entity.BoardQA;

@Component
public class ConversionBoard {
	
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<BoardDto> returnFree(List<BoardFree> b) {
		
		List<BoardDto> detailList = new ArrayList<>();
		
		for(BoardFree bFree : b) {
			BoardDto bDetail = new BoardDto();
			
			bDetail.setBoardNum(bFree.getBoardNum());
			bDetail.setMemId(bFree.getMemId());
			bDetail.setTitle(bFree.getTitle());
			bDetail.setDate(bFree.getDate());
			bDetail.setReview(bFree.getReview());
			
			detailList.add(bDetail);
		}
		
		return detailList;
	}
	
	public BoardFree intoFree(BoardDto detail) {
		
		BoardFree bFree = new BoardFree();
		
		bFree.setTitle(detail.getTitle());
		bFree.setDate(detail.getDate());
		
		return bFree;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public List<BoardDto> returnNotic(List<BoardNotic> b) {
		
		List<BoardDto> detailList = new ArrayList<>();
		
		for(BoardNotic bNotic : b) {
			BoardDto bDetail = new BoardDto();
			
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
	
	public List<BoardDto> returnPromotion(List<BoardPromotion> b) {
		
		List<BoardDto> detailList = new ArrayList<>();
		
		for(BoardPromotion bPromotion : b) {
			BoardDto bDetail = new BoardDto();
			
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
	
	public List<BoardDto> returnEvent(List<BoardEvent> b) {
		
		List<BoardDto> detailList = new ArrayList<>();
		
		for(BoardEvent bEvent : b) {
			BoardDto bDetail = new BoardDto();
			
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
	
	public List<BoardDto> returnQA(List<BoardQA> b) {
		
		List<BoardDto> detailList = new ArrayList<>();
		
		for(BoardQA bQA : b) {
			BoardDto bDetail = new BoardDto();
			
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
	
	public BoardDto returnFree(BoardFree b) {
		
		BoardDto bDetail = new BoardDto();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDto returnNotic(BoardNotic b) {
		
		BoardDto bDetail = new BoardDto();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDto returnPromotion(BoardPromotion b) {
		
		BoardDto bDetail = new BoardDto();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDto returnEvent(BoardEvent b) {
		
		BoardDto bDetail = new BoardDto();
		
		bDetail.setBoardNum(b.getBoardNum());
		bDetail.setMemId(b.getMemId());
		bDetail.setTitle(b.getTitle());
		bDetail.setContent(b.getContent());
		bDetail.setDate(b.getDate());
		bDetail.setReview(b.getReview());
		
		return bDetail;
	}
	
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
	
	public BoardDto returnQA(BoardQA b) {
		
		BoardDto bDetail = new BoardDto();
		
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
