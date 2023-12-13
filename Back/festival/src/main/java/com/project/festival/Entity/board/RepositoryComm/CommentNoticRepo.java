package com.project.festival.Entity.board.RepositoryComm;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.festival.Entity.board.Comm.CommentNotic;

@Repository
public interface CommentNoticRepo extends CrudRepository<CommentNotic, Long> {

	List<CommentNotic> findByBoardNumAndRecoNumIsNullOrderByCoNum(Long boardNum);
	List<CommentNotic> findByBoardNumAndRecoNumOrderByCoNum(Long boardNum, Long recoNum);
	
	void deleteByBoardNum(Long boardNum);
	void deleteByBoardNumAndCoNum(Long boardNum, Long recoNum);

}
