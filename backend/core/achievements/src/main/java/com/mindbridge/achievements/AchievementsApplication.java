package com.mindbridge.achievements;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableAsync
@ComponentScan("com.mindbridge")
@EntityScan("com.mindbridge.data")
@EnableJpaRepositories("com.mindbridge.data")
@EnableScheduling
public class AchievementsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AchievementsApplication.class, args);
	}

}
