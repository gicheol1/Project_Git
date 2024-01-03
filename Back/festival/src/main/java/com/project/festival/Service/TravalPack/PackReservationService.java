package com.project.festival.Service.TravalPack;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Dto.PackReservationDto;
import com.project.festival.Entity.TravalPack.PackReservation;
import com.project.festival.Entity.TravalPack.TravalPack;
import com.project.festival.Entity.TravalPack.Repo.PackReservationRepository;
import com.project.festival.Entity.TravalPack.Repo.TravalPackRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PackReservationService {

	private final PackReservationRepository packReservationRepository;
	private final TravalPackRepository travalPackRepository;
	private final ModelMapper modelMapper;

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

	/* 패키지 예약자 전체 조회 */
	public List<PackReservation> getAllPackReservations() {
		return (List<PackReservation>) packReservationRepository.findAll();
	}

	public List<PackReservationDto> getPackReservationMemId(String memId) {
		// 엔티티(테이블)에서 DTO로 변경함
		// - 기존 코드 
		// return packReservationRepository.findByMemId(memId);
		
		// - 예약목록에 숙소 이름을 출력하기 위한 코드
		// - 에약목록에 숙소 이름이 필요 없을시 제거 
		List<PackReservation> packReservations = packReservationRepository.findByMemId(memId);
		List<PackReservationDto> packDtoList = new ArrayList<>();

		for (PackReservation packRes : packReservations) {
			PackReservationDto packDto = modelMapper.map(packRes, PackReservationDto.class);

			TravalPack travalPack = travalPackRepository.findByPackNum(packRes.getPackNum());

			packDto.setPackName(travalPack.getName());

			packDtoList.add(packDto);
		}

		return packDtoList;

	}

	/* 패키지 예약자 생성 */
	public void createPackReservations(List<PackReservationDto> PackReservationsList) {
		for (PackReservationDto PackReservationDto : PackReservationsList) {
			PackReservation PackReservation = modelMapper.map(PackReservationDto, PackReservation.class);
			
			/* 패키지 여행의 번호를 조회해서 번호에 맞는 가격을 가져와 예약목록에 저장 */
			// - 가격 정보를 불러오기 위한 코드로 필요없을시 제거			
			TravalPack travalPack = travalPackRepository.findByPackNum(PackReservationDto.getPackNum());
			PackReservation.setPrice(travalPack.getPrice());
			
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
	@Transactional
	public void cancelPackReservation(Long resNum) {
		packReservationRepository.deleteById(resNum);
	}

}
