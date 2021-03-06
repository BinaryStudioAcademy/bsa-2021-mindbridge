package com.mindbridge.core.domains.data;

import com.mindbridge.core.domains.data.dto.DataDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// TODO: this is an example reference. Delete after getting familiar with the project structure
@RestController
@RequestMapping("/data")
public class DataController {

	@Autowired
	private DataService dataService;

	@Autowired
	private SimpMessagingTemplate template;

	@GetMapping("/")
	public DataDto getData() throws InterruptedException {
		return dataService.getData();
	}

	@GetMapping("/hello")
	public DataDto greeting() {
		DataDto answer = new DataDto("User");
		template.convertAndSend("/topic/greeting", answer);

		return answer;
	}

}
