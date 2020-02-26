package com.sg.hungrylillithrestservice.controller.request;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Data;

@Data
public class AddScoreRequest {

    @Min(value = 0, message = "Score must be at least 0 points.")
    @Max(value = 999999999, message = "Scores should not reach or exceed 1 billion.")
    private int value;
    @NotNull(message = "Player username cannot be null.")
    private String player_Username;
    @Positive(message = "Platform_ID must be positive.")
    private int platform_ID;
}
