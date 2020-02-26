package com.sg.hungrylillithrestservice.view;

import com.sg.hungrylillithrestservice.model.Score;
import lombok.Data;

@Data
public class ScoreViewResponse {

    // all scores
    private int ID;
    private int value;
    private String playerName;
    private int playerID;
    private String date;
    private String platform;
    
    // particular score
    private String url;

    public ScoreViewResponse(Score score) {
        this(score, false);
    }
    
    public ScoreViewResponse(Score score, boolean complete) {
        this.ID = score.getID();
        this.value = score.getValue();
        this.playerName = score.getPlayer().getUserName();
        this.date = score.getAchievedOn().toString();
        this.platform = score.getPlatform().getName();
        this.playerID = score.getPlayer().getID();
        
        if(complete){
        }
    }
    
}
