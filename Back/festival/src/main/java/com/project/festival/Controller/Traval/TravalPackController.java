package com.project.festival.Controller.Traval;

import java.util.ArrayList;

import javax.annotation.PostConstruct;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.festival.Dto.PaymentDto;
import com.project.festival.Dto.PaymentStatus;
import com.project.festival.Dto.TravalPackDto;
import com.project.festival.Entity.TravalPack.TravalPack;
import com.project.festival.Entity.TravalPack.Repo.TravalPackRepository;
import com.project.festival.Service.TravalPack.TravalPackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TravalPackController {
	private final TravalPackService packService;
	private final TravalPackRepository packRepository;

	// 패키지 여행 전체 조회
	@GetMapping("/travalpackAll")
	private Iterable<TravalPack> getSpaces() {
		return packRepository.findAll();
	}

	// 패키지 여행 세부조회(번호를 통한 조회)
	@GetMapping("/travalpack/{packNum}")
	private TravalPack getTravalPackBypackNum(@PathVariable Long packNum) {
		return packRepository.findByPackNum(packNum);
	}

	// 가상의 패키지 여행 생성
	@PostConstruct
	private void createTravalPack() {
		ArrayList<TravalPackDto> TravalPackList = TravalPackDto.createTravalPack();
		packService.createTravalPack(TravalPackList);
	}
	
	@PostMapping("/travalpack/new")
	public ResponseEntity<TravalPackService> addPack(@RequestBody TravalPackDto packDto) {
		TravalPackService pack = packService.addPack(packDto);
		return ResponseEntity.ok(pack);
	}

}
