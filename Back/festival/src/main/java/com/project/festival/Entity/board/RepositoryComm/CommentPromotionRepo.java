package com.project.festival.Entity.board.RepositoryComm;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Comm.CommentPromotion;

@Repository
public interface CommentPromotionRepo extends CrudRepository<CommentPromotion, Long> {

	List<CommentPromotion> findByBoardNumAndRecoNumIsNullOrderByCoNum(Long boardNum);
	List<CommentPromotion> findByBoardNumAndRecoNumOrderByCoNum(Long boardNum, Long recoNum);
	
	Optional<CommentPromotion> findByBoardNumAndCoNum(Long boardNum, Long recoNum);
	
	boolean findIsDeletedByCoNum(Long coNum);
	
	boolean existsByBoardNumAndCoNumAndMemId(Long boardNum, Long coNum, String memId);
	
	void deleteByBoardNum(Long boardNum);
	void deleteByBoardNumAndCoNum(Long boardNum, Long coNum);

}
