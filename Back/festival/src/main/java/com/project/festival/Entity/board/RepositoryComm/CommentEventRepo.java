package com.project.festival.Entity.board.RepositoryComm;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Comm.CommentEvent;

@Repository
public interface CommentEventRepo extends CrudRepository<CommentEvent, Long> {

	List<CommentEvent> findByBoardNumAndRecoNumIsNullOrderByCoNum(Long boardNum);
	List<CommentEvent> findByBoardNumAndRecoNumOrderByCoNum(Long boardNum, Long recoNum);
	
	Optional<CommentEvent> findByBoardNumAndCoNum(Long boardNum, Long recoNum);
	
	boolean findIsDeletedByCoNum(Long coNum);
	
	boolean existsByBoardNumAndCoNumAndMemId(Long boardNum, Long coNum, String memId);
	
	void deleteByBoardNum(Long boardNum);
	void deleteByBoardNumAndCoNum(Long boardNum, Long coNum);

}
