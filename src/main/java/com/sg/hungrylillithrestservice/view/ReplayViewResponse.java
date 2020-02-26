package com.sg.hungrylillithrestservice.view;

import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.model.Score;
import java.time.LocalDate;
import lombok.Data;

@Data
public class ReplayViewResponse {
    
    private LocalDate uploadedOn;
    private String url;
    private Score score;
    private int ID;
    private String username;

    public ReplayViewResponse(Replay replay, boolean complete) {
        this.uploadedOn = replay.getUploadedOn();
        this.url = replay.getUrl();
        this.ID = replay.getID();
        this.username = replay.getScore().getPlayer().getUserName();
        if (complete){
            this.score = replay.getScore();
        }
    }

}
