package com.project.festival.Entity.board.RepositoryComm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Comm.CommentPromotion;

@Repository
public interface CommentPromotionRepo extends CrudRepository<CommentPromotion, Long> {

	List<CommentPromotion> findByBoardNumAndRecoNumIsNullOrderByCoNum(Long boardNum);
	List<CommentPromotion> findByBoardNumAndRecoNumOrderByCoNum(Long boardNum, Long recoNum);
	
	void deleteByBoardNum(Long boardNum);
	void deleteByBoardNumAndCoNum(Long boardNum, Long recoNum);

}
