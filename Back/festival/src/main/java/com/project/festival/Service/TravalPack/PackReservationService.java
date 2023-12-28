package com.project.festival.Service.TravalPack;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Dto.PackReservationDto;
import com.project.festival.Entity.TravalPack.PackReservation;
import com.project.festival.Entity.TravalPack.Repo.PackReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PackReservationService {
	
	private final PackReservationRepository packReservationRepository;
	private final ModelMapper modelMapper;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	// 페이지별 회원 아이디로 날짜기준 내림차순으로 페키지 예약 정보 가져오기
    public List<PackReservation> getPackReservPage(Pageable pageable, String memId) {
		return packReservationRepository.findAllByMemId(pageable, memId).getContent();
    }
    
    // 회원이 예약한 패키지 여행의 수
    public Long getPackReservCnt(String memId) { return packReservationRepository.countByMemId(memId); }

	/* ========== ========== ========== ========== ========== ========== ========== ========== ========== */

	// 페이지별 특정 날짜 사이의 페키지 예약 정보 가져오기
    public List<PackReservation> getPackReservDatePage(
		Pageable pageable,
		String memId,
		LocalDate startDate,
		LocalDate endDate
    ) {
		return packReservationRepository.findAllByMemIdAndStartDateBetween(pageable, memId, startDate, endDate).getContent();
    }

	// 특정 날짜 사이의 페키지 예약한 갯수 가져오기
    public Long getPackReservDateCnt(
		String memId,
		LocalDate startDate,
		LocalDate endDate
    ) {
    	return packReservationRepository.countByMemIdAndStartDateBetween(memId, startDate, endDate);
    }
    
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	/* 패키지 예약자 전체 조회 */
	public List<PackReservation> getAllPackReservations() {
		return (List<PackReservation>) packReservationRepository.findAll();
	}

	/* ========== ========== ========== ========== ========== ========== ========== ========== ========== */

	/* 패키지 예약자 생성 */
	public void createPackReservations(List<PackReservationDto> PackReservationsList) {
		for (PackReservationDto PackReservationDto : PackReservationsList) {
			PackReservation PackReservation = modelMapper.map(PackReservationDto, PackReservation.class);
			packReservationRepository.save(PackReservation);
		}
	}

		// ※ (테스트용) 패키지 예약자 확인하기
	public void createDefaultPackReservations() {
		ArrayList<PackReservationDto> PackReservation = PackReservationDto.createPackReservations();
		createPackReservations(PackReservation);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	/* 여행 패키지 예약하기 */
	public PackReservation reservationrequest(PackReservationDto packreservationDto, Long packNum, String memId) {
		
		PackReservation packReservation = modelMapper.map(packreservationDto, PackReservation.class);
		packReservation.setPackNum(packNum);
		packReservation.setMemId(memId);
		
		return packReservationRepository.save(packReservation);
	}

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
	
	/* 패키지 여행 예약 취소 */
	public void cancelPackReservation(Long resNum) {
		packReservationRepository.deleteById(resNum);
    }

}
