package com.mindbridge.core.domains.highlight;

import com.mindbridge.core.domains.highlight.dto.SavaHighlightDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("highlight")
@Validated
public class HighlightController {

	private final HighlightService highlightService;

	@Autowired
	public HighlightController(HighlightService highlightService) {
		this.highlightService = highlightService;
	}

	@PostMapping("/save")
	public UUID saveHighlight(@RequestBody SavaHighlightDto highlightDto) {
		return highlightService.save(highlightDto);
	}
}
