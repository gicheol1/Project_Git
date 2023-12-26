package com.project.festival.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.festival.Entity.BlackList;
import com.project.festival.Entity.Repo.BlackListRepo;

import jakarta.transaction.Transactional;
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
	public Optional<BlackList> getBlackListDetail(long blackId) {
		return blackListRepo.findById(blackId);
	}
	
	// 차단 여부 반환
	public boolean isBlackListed(String MemId) { return blackListRepo.existsByUser_MemId(MemId); }
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 차단된 회원 추가, 수정
	public void setBlackList(BlackList blackList) { blackListRepo.save(blackList); }
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 차단 해제하기
    @Transactional
	public void deleteBlackList(Long blackNum) { blackListRepo.deleteById(blackNum); }

}
