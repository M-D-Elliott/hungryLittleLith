package com.sg.hungrylillithrestservice.controller.request;

import java.time.LocalDate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class AddReplayRequest {

    @NotNull(message = "Url cannot be null.")
    @Size(min = 10, max = 512, message = "URL must be between 10 and 512 characters")
    private String replayUrl;
    @Positive(message = "Score_ID must be positive.")
    @NotNull(message = "Score_ID cannot be null.")
    private int scoreID;
    
    @NotNull(message = "Player username cannot be null.")
    private String player_Username;
}
