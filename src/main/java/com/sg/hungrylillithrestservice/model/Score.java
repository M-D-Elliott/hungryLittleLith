package com.sg.hungrylillithrestservice.model;

import com.sg.hungrylillithrestservice.controller.request.AddScoreRequest;
import java.time.LocalDate;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Score {
    
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private int ID;

    @Min(value = 0, message = "Score must be at least 0 points.")
    @Max(value = 999999999, message = "Scores should not reach or exceed 1 billion.")
    private int value;

    LocalDate achievedOn;

    boolean approved;

    @OneToOne
    @JoinColumn(name = "player_ID")
    private Player player;

    @OneToOne
    @JoinColumn(name = "platform_ID")
    @NotNull(message="Platform cannot be null.")
    private Platform platform;

    public Score() {
    }
    
    public Score(AddScoreRequest request) {
        value = request.getValue();
        achievedOn = LocalDate.now();
        approved = false;
        player = new Player();
        player.setUserName(request.getPlayer_Username());
        platform = new Platform();
        platform.setID(request.getPlatform_ID());
    }
}
