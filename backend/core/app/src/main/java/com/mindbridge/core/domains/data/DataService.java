package com.mindbridge.core.domains.data;

import com.mindbridge.core.domains.data.dto.DataDto;
import org.springframework.stereotype.Service;

// TODO: this is an example reference. Delete after getting familiar with the project structure
@Service
public class DataService {

	private static final int THREAD_SLEEP_MILLIS = 1000;

	public DataDto getData() throws InterruptedException {
		Thread.sleep(THREAD_SLEEP_MILLIS);
		return new DataDto("Hello world!");
	}

}
