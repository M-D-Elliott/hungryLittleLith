package com.sg.hungrylillithrestservice.controller;

import com.sg.hungrylillithrestservice.controller.request.AddScoreRequest;
import com.sg.hungrylillithrestservice.controller.request.ApproveScoreRequest;
import com.sg.hungrylillithrestservice.controller.request.GetScoresRequest;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.view.ScoreViewResponse;
import com.sg.hungrylillithrestservice.service.PlayerServiceImpl;
import com.sg.hungrylillithrestservice.service.ReplayServiceImpl;
import com.sg.hungrylillithrestservice.service.ScoreServiceImpl;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/score")
public class ScoreRestController {

    private final ScoreServiceImpl scoreService;
    private final PlayerServiceImpl playerService;
    private final ReplayServiceImpl replayService;

    @Autowired
    public ScoreRestController(ScoreServiceImpl scoreService, PlayerServiceImpl playerService, ReplayServiceImpl replayService) {
        this.scoreService = scoreService;
        this.playerService = playerService;
        this.replayService = replayService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ScoreViewResponse>> allScores() {
        ServiceResponse<List<Score>> response = scoreService.findAll();

        if (!response.isSuccess()) {
            return new ResponseEntity("error", ControllerHelper.getHttpStatus(response, HttpStatus.NOT_FOUND));
        }

        List<Score> scores = response.getValue();

        List<ScoreViewResponse> scoresViewResponse
                = scores.stream()
                        .map(s -> new ScoreViewResponse(s, false))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(scoresViewResponse);
    }
    
    @GetMapping("/")
    public ResponseEntity<List<ScoreViewResponse>> allScoresByPage(@RequestBody GetScoresRequest getScoresRequest) {
        ServiceResponse<List<Score>> response = scoreService.findNewByPage(getScoresRequest.getPage(), getScoresRequest.getPageSize(), getScoresRequest.isApproved());

        if (!response.isSuccess()) {
            return new ResponseEntity(response.getMessages(), ControllerHelper.getHttpStatus(response, HttpStatus.NOT_FOUND));
        }

        List<Score> scores = response.getValue();

        List<ScoreViewResponse> scoresViewResponse
                = scores.stream()
                        .map(s -> new ScoreViewResponse(s, false))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(scoresViewResponse);
    }
    
    @GetMapping("/top")
    public ResponseEntity<List<ScoreViewResponse>> topScores(@RequestBody GetScoresRequest topScoreRequest) {
        ServiceResponse<List<Score>> response = scoreService.findTopByPage(topScoreRequest.getPage(), topScoreRequest.getPageSize());

        if (!response.isSuccess()) {
            return new ResponseEntity("error", ControllerHelper.getHttpStatus(response, HttpStatus.NOT_FOUND));
        }

        List<Score> scores = response.getValue();

        List<ScoreViewResponse> scoresViewResponse
                = scores.stream()
                        .map(s -> new ScoreViewResponse(s, false))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(scoresViewResponse);
    }

    @PostMapping("/add")
    public ResponseEntity<ScoreViewResponse> addScore(@Valid @RequestBody AddScoreRequest addScoreRequest) {
        Score score = new Score(addScoreRequest);

        ServiceResponse<Score> response = scoreService.create(score);

        if (!response.isSuccess()) {
            return new ResponseEntity("error", ControllerHelper.getHttpStatus(response, HttpStatus.BAD_REQUEST));
        }

        score = response.getValue();

        ScoreViewResponse scoreViewResponse = new ScoreViewResponse(score, true);

        return ResponseEntity.ok(scoreViewResponse);
    }

    @PostMapping("/approve")
    public ResponseEntity<ScoreViewResponse> approveScore(@RequestBody @Valid ApproveScoreRequest request) {
        ServiceResponse<Score> response = scoreService.approve(request.getScoreID(), request.getPlayer_Username());

        if (!response.isSuccess()) {
            return new ResponseEntity("error", ControllerHelper.getHttpStatus(response, HttpStatus.BAD_REQUEST));
        }

        Score score = response.getValue();

        ScoreViewResponse scoreViewResponse = new ScoreViewResponse(score, true);

        return ResponseEntity.ok(scoreViewResponse);
    }

    @PostMapping("/{ID}/delete")
    public ResponseEntity<ScoreViewResponse> deleteScore(@PathVariable int ID) {
        ServiceResponse<Score> response = scoreService.delete(ID);

        if (!response.isSuccess()) {
            return new ResponseEntity("error", ControllerHelper.getHttpStatus(response, HttpStatus.BAD_REQUEST));
        }

        Score score = response.getValue();

        ScoreViewResponse scoreViewResponse = new ScoreViewResponse(score, true);

        return new ResponseEntity(scoreViewResponse, HttpStatus.ACCEPTED);
    }
}
