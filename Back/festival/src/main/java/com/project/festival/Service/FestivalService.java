package com.project.festival.Service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.project.festival.Dto.FestivalDto;
import com.project.festival.Entity.Festival;
import com.project.festival.Entity.Repo.FestivalRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FestivalService {

	private final FestivalRepo festivalRepository;
	
	private final ModelMapper modelMapper;
	
	public List<Festival> getFestivalAll() { return festivalRepository.findAll(); }
	
	public void setNewFeatival(FestivalDto dto) {
		Festival festival = modelMapper.map(dto, Festival.class);
		festivalRepository.save(festival);
	}
}
