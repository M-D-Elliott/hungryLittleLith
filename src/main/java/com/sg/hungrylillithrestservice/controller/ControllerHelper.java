package com.sg.hungrylillithrestservice.controller;

import com.sg.hungrylillithrestservice.service.response.Response;
import com.sg.hungrylillithrestservice.service.response.ResponseStatus;
import org.springframework.http.HttpStatus;

public final class ControllerHelper {

    private ControllerHelper() {
    }
    
    public static HttpStatus getHttpStatus(Response response, HttpStatus defaultStatus) {
        if (response.getStatus() == ResponseStatus.NOT_FOUND) {
            return HttpStatus.NOT_FOUND;
        } else if (response.getStatus() == ResponseStatus.INVALID) {
            return HttpStatus.UNPROCESSABLE_ENTITY;
        }
        return defaultStatus;
    }

}
