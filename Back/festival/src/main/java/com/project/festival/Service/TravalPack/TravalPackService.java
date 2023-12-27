package com.project.festival.Service.TravalPack;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Dto.TravalPackDto;
import com.project.festival.Entity.TravalPack.TravalPack;
import com.project.festival.Entity.TravalPack.Repo.TravalPackRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TravalPackService {

	private final TravalPackRepository packRepository;
	private final ModelMapper modelMapper;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 페이지별 모든 패키지 여행 가져오기
	public List<TravalPack> getTravalPage(Pageable pageable) {
		return packRepository.findAll(pageable).getContent();
	}
	
	public long getTravalCnt() { return packRepository.count(); }
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

	// 페이지별 기간에 맟는 패키지 여행 가져오기
	public List<TravalPack> getTravalPageDateDiff(Pageable pageable, List<Integer> days) {
		return packRepository.findAllByDateDifference(pageable, days).getContent();
	}
	
	public long getTravalDateDiffCnt(List<Integer> days) { return packRepository.countByDateDifference(days); }
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

    // 페이지별 특정 위치의 패키지 여행 가져오기
	public List<TravalPack> getTravalPageLocation(Pageable pageable, String address) {
		return packRepository.findByAddressContaining(pageable, address).getContent();
	}
	
	public long getTravalLocationCnt(String address) { return packRepository.countByAddressContaining(address); }
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

    // 페이지별 특정 위치의 기간에 맟는 패키지 여행 가져오기
	public List<TravalPack> getTravalPageDateAndLocation(Pageable pageable, List<Integer> days, String address) {
		return packRepository.findAllByDateDifferenceAndAddressContaining(pageable, days, address).getContent();
	}
	
	public long getTravalDateAndLocationCnt(List<Integer> days, String address) {
		return packRepository.countByDateDifferenceAndAddressContaining(days, address);
	}
	
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ========== ==========
// ========== ========== ========== ========== ========== ========== ========== ========== ==========

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// - 패키지 여행 생성
	public void createTravalPack(ArrayList<TravalPackDto> TravalPackList) {

		for (TravalPackDto TravalPackDto : TravalPackList) {
			TravalPack travalPack = modelMapper.map(TravalPackDto, TravalPack.class);

			packRepository.save(travalPack);
		}
	}

	// 패키지 여행 생성, 수정
	public Long addPack(TravalPackDto packDto) {
		TravalPack travalPack = modelMapper.map(packDto, TravalPack.class);
		
		// 생성, 수정시 패키지 번호 반환
		return packRepository.save(travalPack).getPackNum();
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 패키지 여행 삭제
	public void deleteTravalpack(Long packNum) {
		packRepository.deleteById(packNum);
	}

}
