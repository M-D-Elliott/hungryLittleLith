package com.sg.hungrylillithrestservice.controller;

import com.sg.hungrylillithrestservice.controller.request.AddReplayRequest;
import com.sg.hungrylillithrestservice.controller.request.DeleteReplayRequest;
import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.ReplayService;
import com.sg.hungrylillithrestservice.service.ReplayServiceImpl;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import com.sg.hungrylillithrestservice.view.ReplayViewResponse;
import com.sg.hungrylillithrestservice.view.ScoreViewResponse;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/replay")
public class ReplayRestController {

    private final ReplayService replayService;

    public ReplayRestController(ReplayServiceImpl replayService) {
        this.replayService = replayService;
    }

    @GetMapping("/{scoreID}")
    public ResponseEntity<List<ReplayViewResponse>> findReplayByScoreID(@PathVariable int scoreID) {
        ServiceResponse<List<Replay>> response = replayService.getByScoreID(scoreID);

        if (!response.isSuccess()) {
            return new ResponseEntity(response.getMessages(), ControllerHelper.getHttpStatus(response, HttpStatus.NOT_FOUND));
        }

        List<Replay> replays = response.getValue();

        List<ReplayViewResponse> replaysViewResponse
                = replays.stream()
                        .map(r -> new ReplayViewResponse(r, true))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(replaysViewResponse);
    }

    @PostMapping("/add")
    public ResponseEntity<Replay> addReplayByScoreID(@RequestBody @Valid AddReplayRequest request) {

        Replay replay = new Replay(request);

        ServiceResponse<Replay> response = replayService.create(replay, request.getScoreID(), request.getPlayer_Username());

        if (!response.isSuccess()) {
            return new ResponseEntity(response.getMessages(), ControllerHelper.getHttpStatus(response, HttpStatus.BAD_REQUEST));
        }

        return ResponseEntity.ok(response.getValue());
    }

    @PostMapping("/delete")
    public ResponseEntity<ReplayViewResponse> deleteReplay(@RequestBody @Valid DeleteReplayRequest request) {
        ServiceResponse<Replay> response = replayService.delete(request.getReplayID(), request.getPlayer_Username());

        if (!response.isSuccess()) {
            return new ResponseEntity(response.getMessages(), ControllerHelper.getHttpStatus(response, HttpStatus.BAD_REQUEST));
        }

        ReplayViewResponse viewResponse = new ReplayViewResponse(response.getValue(), true);

        return new ResponseEntity(viewResponse, HttpStatus.ACCEPTED);
    }
}
