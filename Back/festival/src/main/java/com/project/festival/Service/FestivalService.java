package com.project.festival.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.festival.Entity.Festival;
import com.project.festival.Entity.Repo.FestivalRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FestivalService {

	private final FestivalRepo festivalRepository;
	
	public List<Festival> getFestivalAll() {
		
		return festivalRepository.findAll();
	}
}
