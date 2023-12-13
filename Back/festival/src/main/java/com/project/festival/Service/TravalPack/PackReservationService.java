package com.project.festival.Service.TravalPack;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.festival.Dto.PackReservationDto;
import com.project.festival.Entity.Repo.UserRepo;
import com.project.festival.Entity.TravalPack.PackReservation;
import com.project.festival.Entity.TravalPack.Repo.PackReservationRepository;
import com.project.festival.Entity.TravalPack.Repo.TravalPackRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PackReservationService {
	
	private final TravalPackRepository packRepository;
	private final UserRepo userRepository;
	
	private final PackReservationRepository packReservationRepository;
	private final ModelMapper modelMapper;

	/* -----------------------------------------------------------------------------*/

	/* 패키지 예약자 전체 조회 */
	public List<PackReservation> getAllPackReservations() {
		return packReservationRepository.findAll();
	}

	/* -----------------------------------------------------------------------------*/

	/* 패키지 예약자 생성 */
	public void createPackReservations(List<PackReservationDto> PackReservationsList) {
		for (PackReservationDto PackReservationDto : PackReservationsList) {
			PackReservation PackReservation = modelMapper.map(PackReservationDto, PackReservation.class);
			packReservationRepository.save(PackReservation);
		}
	}

	/* -----------------------------------------------------------------------------*/
	
	/* 여행 패키지 예약하기 */
	public PackReservation reservationrequest(PackReservationDto packreservationDto, Long packNum, String memId) {
		
		PackReservation packReservation = modelMapper.map(packreservationDto, PackReservation.class);
		packReservation.setPackNum(packNum);
		packReservation.setMemId(memId);
		
		return packReservationRepository.save(packReservation);
	}

}
