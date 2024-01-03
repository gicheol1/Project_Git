package com.project.festival.Service.festival;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Dto.FestivalDto;
import com.project.festival.Entity.festival.Festival;
import com.project.festival.Entity.festival.FestivalRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FestivalService {

	private final FestivalRepo festivalRepository;
	
	private final ModelMapper modelMapper;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	public List<Festival> getFestivalAll() { return festivalRepository.findAll(); }

	public List<Long> getFestivalAllNumber() { return festivalRepository.findAllFestivalNumBy(); }
	
	public List<Festival> getFestivalPage(Pageable pageable) {
		return festivalRepository.findAllByOrderByFestivalNumDesc(pageable).getContent();
	}
	
	public long getFestivalCnt() {return festivalRepository.count(); }
	
	public Festival getFestival(Long festivalNum) {
		
		Optional<Festival> festival = festivalRepository.findByFestivalNum(festivalNum);
		
		if(festival.isEmpty()) {
			return null;
		} else {
			return festival.get();
		}
	}

// ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ==========
	
	public Long setNewFeatival(FestivalDto dto) {
		Festival festival = modelMapper.map(dto, Festival.class);
		return festivalRepository.save(festival).getFestivalNum();
	}

	/* 테스트용 축제 데이터 */
	public void createFestival(ArrayList<FestivalDto> createFestivalList) {
		for (FestivalDto festivalDto : createFestivalList) {
			Festival festival = modelMapper.map(festivalDto, Festival.class);
			festivalRepository.save(festival);
		}
	}
	
// ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ==========

	@Transactional
	public void deleteFestival(Long festivalNum) { festivalRepository.deleteByFestivalNum(festivalNum); }

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
}
