package com.mindbridge.core.domains.highlight;

import com.mindbridge.core.domains.highlight.dto.HighlightsDetailsDto;
import com.mindbridge.core.domains.highlight.dto.SavaHighlightDto;
import com.mindbridge.data.domains.highlight.HighlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class HighlightService {

	private final HighlightRepository highlightRepository;

	@Autowired
	public HighlightService(HighlightRepository highlightRepository) {
		this.highlightRepository = highlightRepository;
	}

	public HighlightsDetailsDto save(SavaHighlightDto highlightDto) {
		var highlight = HighlightMapper.MAPPER.saveHighlightDtoToHighlight(highlightDto);
		var savedHighlight = highlightRepository.save(highlight);
		return HighlightMapper.MAPPER.fromHighlightToHighlightDetailsDto(savedHighlight);
	}

	public List<HighlightsDetailsDto> getAllHighlights(UUID userId, Integer from, Integer count) {
		var pageable = PageRequest.of(from / count, count);
		var highlights = highlightRepository.getAllByUserId(userId, pageable);
		return highlights.stream().map(HighlightMapper.MAPPER::fromHighlightToHighlightDetailsDto).collect(Collectors.toList());
	}


    public UUID deleteHighlight(UUID id) {
		highlightRepository.deleteById(id);
		return id;
    }

	public List<HighlightsDetailsDto> getAllHighlights(UUID userId) {
		var highlights = highlightRepository.getAllByUserId(userId);
		return highlights.stream().map(HighlightMapper.MAPPER::fromHighlightToHighlightDetailsDto).collect(Collectors.toList());
	}
}
