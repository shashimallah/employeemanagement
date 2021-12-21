package com.shashimallah.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BasicInputException extends RuntimeException {

	/**
	 * Default serial version ID
	 */
	private static final long serialVersionUID = -2516240148483533071L;

	public BasicInputException() {
		super();
	}

	public BasicInputException(String message) {
		super(message);
	}

	public BasicInputException(String message, Throwable cause) {
		super(message, cause);
	}
}
