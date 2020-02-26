package com.sg.hungrylillithrestservice.service.response;

import java.util.ArrayList;
import java.util.List;

public abstract class Response {

    private ResponseStatus status = ResponseStatus.SUCCESS;

    private final List<String> messages = new ArrayList<>();

    public ResponseStatus getStatus() {
        return status;
    }

    public boolean isSuccess() {
        return status == ResponseStatus.SUCCESS;
    }

    public List<String> getMessages() {
        return new ArrayList<>(messages);
    }

    public final void addNotFoundError(String message) {
        addError(message, ResponseStatus.NOT_FOUND);
    }

    public final void addInvalidError(String message) {
        addError(message, ResponseStatus.INVALID);
    }

    private void addError(String message, ResponseStatus status) {
        this.status = status;
        messages.add(message);
    }

}