package com.project.festival.Controller.Traval;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Dto.PackReservationDto;
import com.project.festival.Entity.TravalPack.PackReservation;
import com.project.festival.Entity.TravalPack.Repo.PackReservationRepository;
import com.project.festival.Entity.TravalPack.Repo.TravalPackRepository;
import com.project.festival.Service.AuthService;
import com.project.festival.Service.JwtService;
import com.project.festival.Service.TravalPack.PackReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/packreservation")
public class PackReservationController { /* 사용자 요청 처리(패키지 여행 예약 하기) */
	
	private final PackReservationService packReservationService;
	private final PackReservationRepository packReservationRepository;
	
	private final TravalPackRepository travalPackRepository;

	private final ModelMapper modelMapper;

	private final JwtService jwtService;
	private final AuthService authService;

	/* -----------------------------------------------------------------------------*/

	/* 패키지 여행 예약자 전체 조회 */
	@GetMapping
	public List<PackReservation> getAllPackReservations() {
		return packReservationService.getAllPackReservations();
	}

	/* -----------------------------------------------------------------------------*/
	
	/* 패키지 여행 상세 내역 조회(번호를 통한 조회) */
	@GetMapping("/{resNum}")
	private PackReservationDto getTravalPackBypackNum(
		@PathVariable Long resNum
	) {
		
		PackReservationDto packDto = modelMapper.map(packReservationRepository.findByResNum(resNum), PackReservationDto.class);
		packDto.setPackName(travalPackRepository.findByPackNum(packDto.getPackNum()).getName());
		packDto.setPrice(travalPackRepository.findByPackNum(packDto.getPackNum()).getPrice());
		
		return packDto;
	}

	/* -----------------------------------------------------------------------------*/

	/* 패키지 여행 예약한 회원아이디로 여행예약내역 요청 */
	@PostMapping("/memberpackreservation/{memId}")
	public List<PackReservationDto> getPackReservationBymemId(@PathVariable String memId) {
		
		List<PackReservationDto> packList = new ArrayList<>();
		
		for (PackReservation packRes : packReservationRepository.findByMemId(memId)) {
			PackReservationDto packDto = modelMapper.map(packRes, PackReservationDto.class);
			packDto.setPackName(travalPackRepository.findByPackNum(packRes.getPackNum()).getName());
			packDto.setPrice(travalPackRepository.findByPackNum(packDto.getPackNum()).getPrice());
			packList.add(packDto);
		}
		
		return packList;
	}

	/* -----------------------------------------------------------------------------*/

	/* 패키지여행의 번호(기본키를 통한 정보)와 회원아이디를 통해 여행 예약하기(생성하기) */
	@PostMapping("/reservation/{packNum}/{jwt}")
	public ResponseEntity<?> reservationrequest(
		@PathVariable Long packNum,
		@PathVariable String jwt,
		@RequestBody PackReservationDto packReservationDto
	) {

		if(!authService.isLogin(jwt)) { return ResponseEntity.ok(false); }
		
		// 여행 예약
		try {
			PackReservation packReservation = 
				packReservationService.reservationrequest(
					packReservationDto,
					packNum,
					jwtService.getAuthUser(jwt).get("jti", String.class)
			);
			
			return ResponseEntity.ok(packReservation);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
		}
	}

}
