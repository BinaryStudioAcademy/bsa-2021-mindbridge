package com.mindbridge.core.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.RelativePathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.servlet.ServletContext;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	private final ServletContext servletContext;

	@Autowired
	public SwaggerConfig(ServletContext servletContext) {
		this.servletContext = servletContext;
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
			.pathProvider(new RelativePathProvider(servletContext) {
				@Override
				public String getApplicationBasePath() {
					return "/api";
				}
			})
			.select().apis(RequestHandlerSelectors.any()).paths(PathSelectors.any()).build();
	}
}
