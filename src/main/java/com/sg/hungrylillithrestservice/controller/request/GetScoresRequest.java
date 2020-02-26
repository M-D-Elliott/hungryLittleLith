package com.sg.hungrylillithrestservice.controller.request;

import lombok.Data;

@Data
public class GetScoresRequest {
    private int page;
    private int pageSize;
    private boolean approved;
}
