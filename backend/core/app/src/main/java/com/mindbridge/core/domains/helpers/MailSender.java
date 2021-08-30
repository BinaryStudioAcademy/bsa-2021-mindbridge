package com.mindbridge.core.domains.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSender {
	@Autowired
	private JavaMailSender emailSender;

	@Value("${spring.mail.username}")
	private String username;

	public void sendEmail(String emailTo, String subject, String message) {
		SimpleMailMessage emailMessage = new SimpleMailMessage();

		emailMessage.setFrom(username);
		emailMessage.setTo(emailTo);
		emailMessage.setSubject(subject);
		emailMessage.setText(message);

		emailSender.send(emailMessage);
	}
}
