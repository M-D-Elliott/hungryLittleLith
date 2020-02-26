package com.sg.hungrylillithrestservice.controller.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Data;

@Data
public class DeleteReplayRequest {
    @Positive(message = "Replay_ID must be positive.")
    @NotNull(message = "Replay_ID cannot be null.")
    private int replayID;
    
    @NotNull(message = "Player username cannot be null.")
    private String player_Username;
}
