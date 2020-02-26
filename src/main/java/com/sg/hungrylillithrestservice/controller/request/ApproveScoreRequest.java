package com.sg.hungrylillithrestservice.controller.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Data;

@Data
public class ApproveScoreRequest {
    
    @Positive(message = "Replay_ID must be positive.")
    @NotNull(message = "Replay_ID cannot be null.")
    private int scoreID;

    @NotNull(message = "Player username cannot be null.")
    private String player_Username;
}
