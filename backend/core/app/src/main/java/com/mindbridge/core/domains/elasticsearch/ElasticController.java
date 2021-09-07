package com.mindbridge.core.domains.elasticsearch;

import com.mindbridge.core.domains.post.dto.PostsListDetailsDto;
import com.mindbridge.data.domains.elasticsearch.model.ElasticEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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

	@GetMapping("/")
	public List<ElasticEntity> search(@RequestParam("query") String query) {
		return service.search(query);
	}

	@GetMapping("/list")
	public List<PostsListDetailsDto> searchList(@RequestParam("query") String query,
												@RequestParam(defaultValue = "0") Integer from, @RequestParam(defaultValue = "10") Integer count, Principal principal) {
		return service.searchList(query, from, count, principal);
	}

	@GetMapping("/count")
	public long getCountOfResults(@RequestParam("query") String query) {
		return service.getCountOfResults(query);
	}

	@DeleteMapping("/clear")
	public String clear() {
		long itm = service.deleteAll();
		return "Deleted " + itm + " items";
	}

	@GetMapping("/sync")
	public void sync() {
		service.add();
	}

	@GetMapping("/tags/")
	public List<ElasticEntity> searchByTag(@RequestParam("query") String query) {
		return service.searchByTags(query);

	}

	@GetMapping("/author/")
	public List<ElasticEntity> searchByAuthor(@RequestParam("query") String query) {
		return service.searchByAuthor(query);

	}

}
