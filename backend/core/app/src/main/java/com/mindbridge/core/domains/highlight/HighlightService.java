package com.mindbridge.core.domains.highlight;

import com.mindbridge.core.domains.highlight.dto.HighlightsDetailsDto;
import com.mindbridge.core.domains.highlight.dto.SavaHighlightDto;
import com.mindbridge.data.domains.highlight.HighlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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

	public UUID save(SavaHighlightDto highlightDto) {
		var highlight = HighlightMapper.MAPPER.saveHighlightDtoToHighlight(highlightDto);
		var savedHighlight = highlightRepository.save(highlight);
		return savedHighlight.getId();
	}

	public List<HighlightsDetailsDto> getAllHighlights(UUID userId) {
		var highlights = highlightRepository.getAllByUserId(userId);
		return highlights.stream().map(HighlightMapper.MAPPER::fromHighlightToHighlightDetailsDto).collect(Collectors.toList());
	}

    public void deleteHighlight(UUID id) {
		highlightRepository.deleteById(id);
    }
}
