package com.mindbridge.core.domains.data;

import com.mindbridge.core.domains.data.dto.DataDto;
import org.springframework.stereotype.Service;

@Service
public class DataService {
    public DataDto getData() {
        return new DataDto("Hello world!");
    }
}
