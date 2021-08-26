package com.mindbridge.core.domains.highlight;

import com.mindbridge.core.domains.highlight.dto.SavaHighlightDto;
import com.mindbridge.data.domains.highlight.HighlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class HighlightService {

	private final HighlightRepository highlightRepository;

	@Lazy
	@Autowired
	public HighlightService(HighlightRepository highlightRepository) {
		this.highlightRepository = highlightRepository;
	}

	public UUID save(SavaHighlightDto highlightDto) {
		var highlight = HighlightMapper.MAPPER.saveHighlightDtoToHighlight(highlightDto);
		var savedHighlight = highlightRepository.save(highlight);
		return savedHighlight.getId();
	}
}
