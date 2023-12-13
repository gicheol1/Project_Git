package com.project.festival.Entity.board.RepositoryComm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Comm.CommentEvent;

@Repository
public interface CommentEventRepo extends CrudRepository<CommentEvent, Long> {

	List<CommentEvent> findByBoardNumAndRecoNumIsNullOrderByCoNum(Long boardNum);
	List<CommentEvent> findByBoardNumAndRecoNumOrderByCoNum(Long boardNum, Long recoNum);
	
	void deleteByBoardNum(Long boardNum);
	void deleteByBoardNumAndCoNum(Long boardNum, Long recoNum);

}
