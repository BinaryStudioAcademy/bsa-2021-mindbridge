package com.mindbridge.core.domains.helpers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateFormatter {

	public static String getDate(Date date) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM, hh:mm", Locale.ENGLISH);
		return dateFormat.format(date);
	}

	public static String getDate(Date date, String format) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(format, Locale.ENGLISH);
		return dateFormat.format(date);
	}

}
