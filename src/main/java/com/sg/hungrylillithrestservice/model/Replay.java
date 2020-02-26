package com.sg.hungrylillithrestservice.model;

import com.sg.hungrylillithrestservice.controller.request.AddReplayRequest;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Replay {

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private int ID;

    @NotNull(message = "Upload date cannot be null.")
    LocalDate uploadedOn;

    @NotNull(message = "Url cannot be null.")
    @Size(min = 10, max = 512, message = "URL must be between 10 and 512 characters")
    String url;

    public Replay() {
    }

    @ManyToOne
    @JoinColumn(name = "score_id", nullable = false)
    private Score score;

    public Replay(AddReplayRequest addReplayRequest) {
        this.url = addReplayRequest.getReplayUrl();
    }
}
