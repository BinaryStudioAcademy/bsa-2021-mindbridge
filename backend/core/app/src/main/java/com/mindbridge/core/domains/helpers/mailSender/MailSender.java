package com.mindbridge.core.domains.helpers.mailSender;

public interface MailSender {
	public void sendEmail(String emailTo, String subject, String message);
}
