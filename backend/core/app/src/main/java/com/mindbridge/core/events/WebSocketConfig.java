package com.mindbridge.core.events;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic");
		config.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000",
				"http://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/",
				"https://mindbridge-lb-252634146.eu-west-1.elb.amazonaws.com/",
				"http://mindbridge.westeurope.azurecontainer.io/", "https://mindbridge.westeurope.azurecontainer.io/")
				.withSockJS();
	}

}
