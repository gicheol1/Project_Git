package com.project.festival.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.festival.Dto.BlackListDto;
import com.project.festival.Entity.BlackList;
import com.project.festival.Entity.User;
import com.project.festival.Entity.Repo.BlackListRepo;
import com.project.festival.Entity.Repo.UserRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlackListService {
	
	private final BlackListRepo blackListRepo;
	private final UserRepo userRepo;
	
	private final ModelMapper modelMapper;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 페이지별 차단된 회원 불러오기
	public List<BlackListDto> getBlackList(Pageable pageable) {
		
		List<BlackListDto> dto = new ArrayList<>();
		
		for(BlackList list : blackListRepo.findByOrderByBanDateDesc(pageable).getContent()) {
			BlackListDto d = modelMapper.map(list, BlackListDto.class);
			d.setMemId(list.getUser().getMemId());
			dto.add(d);
		}
		
		return dto;
	}
	
	// 저장된 블랙리스트 갯수 반환
	public long getBlackListCnt() { return blackListRepo.count(); }
	
	// 저장된 블랙리스트 갯수 반환
	public Optional<BlackList> getBlackListDetail(long blackNum) {
		return blackListRepo.findById(blackNum);
	}
	
	// 차단 여부 반환
	public boolean isBlackListed(String memId) { return blackListRepo.existsByUser_MemId(memId); }
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 차단된 회원 추가, 수정
	public boolean setBlackList(BlackListDto dto) {
		
		Optional<User> user = userRepo.findById(dto.getMemId());
		
		if(user.isEmpty()) {return false;}
		
		BlackList black = modelMapper.map(dto, BlackList.class);
		black.setUser(user.get());
		
		blackListRepo.save(black);
		return true;
	}
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 차단 해제하기
    @Transactional
	public void deleteBlackList(Long blackNum) { blackListRepo.deleteById(blackNum); }

}
