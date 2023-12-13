package com.project.festival.Service.TravalPack;

import java.util.ArrayList;

import org.modelmapper.ModelMapper;
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

	private final ModelMapper modelMapper;
	private final TravalPackRepository packRepository;
	
	public void createTravalPack(ArrayList<TravalPackDto> TravalPackList) {
		
		for (TravalPackDto TravalPackDto : TravalPackList) {
			TravalPack travalPack = modelMapper.map(TravalPackDto, TravalPack.class);
			
//			TravalPack travalPack = new TravalPack();
//			
//			travalPack.setName(TravalPackDto.getName());
//			travalPack.setPrice(TravalPackDto.getPrice());
//			travalPack.setStartDate(TravalPackDto.getStartDate());
//			travalPack.setEndDate(TravalPackDto.getEndDate());
//			travalPack.setSingupDate(TravalPackDto.getSingupDate());
//			travalPack.setCount(TravalPackDto.getCount());
//			travalPack.setSmoke(TravalPackDto.getSmoke());
//			travalPack.setAddress(TravalPackDto.getAddress());
//			travalPack.setText(TravalPackDto.getText());
//			travalPack.setPerson(TravalPackDto.getPerson());
//			travalPack.setReservation(TravalPackDto.getReservation());
			
			packRepository.save(travalPack);
		}
	}

}
