package com.dxc.application.utils;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.dxc.application.constants.MessagesConstants;
import com.dxc.application.exceptions.ApplicationException;

public final class MessageUtil {
	// protected new Instant
	private MessageUtil() {
	}

	private static String getCauseErrorMessage(Exception e) {
		Throwable cause = e.getCause();

		return (cause == null ? e.getMessage() : cause.getMessage());
	}

	public static String getErrorMessage(MessageSource messageSource, Exception e, HttpServletRequest request) {

		return getErrorMessage(messageSource, e, null, request);
	}

	public static String getErrorMessage(MessageSource messageSource, Exception e, Object messageParam[], HttpServletRequest request) {

		String error = getCauseErrorMessage(e);
		String[] text = StringUtils.split(error, ":");

		if (e instanceof ApplicationException) {
			ApplicationException ae = (ApplicationException) e;
			return messageSource.getMessage(ae.getMessageCode(), ae.getParam(), RequestContextUtils.getLocale(request));

		} else if (e instanceof DataAccessException) {

			if (StringUtils.isNotBlank(text[0])) {
				text[0] = text[0].trim();

				if (text[0].equals("ORA-04063")) {
					return messageSource.getMessage(MessagesConstants.DATABASE_ERROR, new String[] { error }, RequestContextUtils.getLocale(request));
				} else if (text[0].equals("ORA-00001")) {
					return messageSource.getMessage(MessagesConstants.DATA_DUPPLICATED, new String[] {}, RequestContextUtils.getLocale(request));
				} else if (text[0].equals("IO Error") || text[0].indexOf("Could not get Connection") > -1) {
					return messageSource.getMessage(MessagesConstants.DATABASE_NOT_CONNECT, new String[] {}, RequestContextUtils.getLocale(request));
				}
			}

			return messageSource.getMessage(MessagesConstants.DATABASE_ERROR, new String[] { error }, RequestContextUtils.getLocale(request));

		} else {

			return messageSource.getMessage(MessagesConstants.ERROR_UNDEFINED_ERROR, new String[] { error }, RequestContextUtils.getLocale(request));
		}
	}

}
