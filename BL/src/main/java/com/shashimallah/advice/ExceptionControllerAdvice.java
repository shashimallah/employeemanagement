package com.shashimallah.advice;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.shashimallah.exceptions.BasicInputException;

@ControllerAdvice
public class ExceptionControllerAdvice extends ResponseEntityExceptionHandler {

	@ExceptionHandler(BasicInputException.class)
	public ResponseEntity<Map<String, Object>> handleBasicInputException(BasicInputException exception) {
		Map<String, Object> hmap = new HashMap<>();
		hmap.put("message", exception.getMessage());
		return new ResponseEntity<Map<String, Object>>(hmap, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException noSuchElementException) {
		return new ResponseEntity<String>("No data found, please change the parameter.", HttpStatus.NOT_FOUND);
	}

}
