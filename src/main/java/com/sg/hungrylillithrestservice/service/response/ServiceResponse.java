package com.sg.hungrylillithrestservice.service.response;

public class ServiceResponse<T> extends Response  {
    private T value;

    public ServiceResponse(T value) {
        this.value = value;
    }

    public ServiceResponse() {
    }
    
    public T getValue() {
        return value;
    }

    public ServiceResponse<T> setValue(T value) {
        this.value = value;
        return this;
    }

}