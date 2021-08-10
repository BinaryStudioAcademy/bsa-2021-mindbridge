package com.mindbridge.core.domains.tag;

import com.mindbridge.data.domains.tag.dto.TagDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tag")
@Validated
public class TagController {

	private final TagService tagService;

	@Autowired
	public TagController(TagService tagService) {
		this.tagService = tagService;
	}

	@GetMapping("/all")
	public List<TagDto> getTags() {
		return tagService.getTags();
	}

}
