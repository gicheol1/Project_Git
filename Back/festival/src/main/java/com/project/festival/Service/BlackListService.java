package com.project.festival.Service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.BlackList;
import com.project.festival.Entity.Repo.BlackListRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlackListService {
	
	private final BlackListRepo blackListRepo;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 페이지별 차단된 회원 불러오기
	public List<BlackList> getBlackList(Pageable pageable) {
		return blackListRepo.findAllByOrderByDateDesc(pageable).getContent();
	}

}
