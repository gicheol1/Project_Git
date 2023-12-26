package com.project.festival.Service;

import java.util.List;
import java.util.Optional;

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
		return blackListRepo.findAllByOrderByBanDateDesc(pageable).getContent();
	}
	
	// 저장된 블랙리스트 갯수 반환
	public long getBlackListCnt() { return blackListRepo.count(); }
	
	// 저장된 블랙리스트 갯수 반환
	public Optional<BlackList> getBlackListDetail(String memId) {
		return blackListRepo.findByUser_MemId(memId);
	}
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 페이지별 차단된 회원 불러오기
	public void addBlackList(BlackList blackList) { blackListRepo.save(blackList); }
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 차단 해제하기
	public void deleteBlackList(String memId) { blackListRepo.deleteByUser_MemId(memId); }

}
