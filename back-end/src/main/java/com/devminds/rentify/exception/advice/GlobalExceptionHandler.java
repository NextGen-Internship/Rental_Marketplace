package com.devminds.rentify.exception.advice;

import com.devminds.rentify.exception.ObjectNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final String ERROR_MESSAGE_TEMPLATE = "{ \"error\": \"%s\" }";

    @ExceptionHandler(value = {ObjectNotFoundException.class})
    public ResponseEntity<String> handleNotFound(RuntimeException e) {
        String bodyOfResponse = String.format(ERROR_MESSAGE_TEMPLATE, e.getMessage());
        return new ResponseEntity<>(bodyOfResponse, HttpStatus.NOT_FOUND);
    }
}
