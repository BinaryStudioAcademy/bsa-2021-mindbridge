package com.mindbridge.core.domains.data;

import com.mindbridge.core.domains.data.dto.DataDto;
import org.springframework.stereotype.Service;

// TODO: this is an example reference. Delete after getting familiar with the project structure
@Service
public class DataService {
    public DataDto getData() throws InterruptedException {
    	Thread.sleep(1000);
        return new DataDto("Hello world!");
    }
}
