package com.project.festival.Entity.board.RepositoryComm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Comm.CommentQA;

@Repository
public interface CommentQARepo extends CrudRepository<CommentQA, Long> {

	List<CommentQA> findByBoardNumAndRecoNumIsNullOrderByCoNum(Long boardNum);
	List<CommentQA> findByBoardNumAndRecoNumOrderByCoNum(Long boardNum, Long recoNum);
	
	void deleteByBoardNum(Long boardNum);
	void deleteByBoardNumAndCoNum(Long boardNum, Long recoNum);

}
