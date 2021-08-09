package com.mindbridge.core.domains.elasticsearch;

import com.mindbridge.data.domains.elasticsearch.model.ElasticEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class ElasticController {

	@Autowired
	private ElasticService service;

	@GetMapping("/get")
	public List<ElasticEntity> getAll() {
		return service.findAll();
	}

	@GetMapping("/{query}")
	public List<ElasticEntity> search(@PathVariable("query") String query) {
		return service.search(query);
	}

	@DeleteMapping("/clear")
	public String clear() {
		long itm = service.deleteAll();
		return "Deleted " + itm + " items";
	}

	@GetMapping("/sync")
	public void pot() {
		service.add();
	}

	@GetMapping("/tags/{query}")
	public List<ElasticEntity> searchByTag(@PathVariable("query") String query) {
		return service.searchByTags(query);

	}

	@GetMapping("/author/{query}")
	public List<ElasticEntity> searchByAuthor(@PathVariable("query") String query) {
		return service.searchByAuthor(query);

	}

}
