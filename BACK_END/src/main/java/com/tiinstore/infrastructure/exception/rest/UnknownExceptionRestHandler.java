package com.tiinstore.infrastructure.exception.rest;

import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author Nguyễn Vinh
 */
@RestControllerAdvice
public final class UnknownExceptionRestHandler extends
        ShoseExceptionRestHandler<Exception> {

    @Override
    protected Object wrapApi(Exception ex) {
        return ex.getMessage();
    }
}
