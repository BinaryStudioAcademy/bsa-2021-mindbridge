package com.mindbridge.core.domains.helpers.mailSender;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("TEST")
public class DummyMailSender implements MailSender{
	@Override
	public void sendEmail(String emailTo, String subject, String message) {

	}
}
