package com.sg.hungrylillithrestservice.service;

import com.sg.hungrylillithrestservice.dao.PlayerRepository;
import com.sg.hungrylillithrestservice.dao.ReplayRepository;
import com.sg.hungrylillithrestservice.dao.ScoreRepository;
import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReplayServiceImpl implements ReplayService {

    @Autowired
    private final ReplayRepository replayRepo;

    @Autowired
    private final ScoreRepository scoreRepo;

    @Autowired
    private final PlayerRepository playerRepo;

    private static final int MAX_REPLAYS = 4;
    public static final String NOT_ADMIN = "You are not an admin.";
    public static final String STOP_HACKING = " Stop hacking my site!";
    public static final String SCORE_DOES_NOT_EXIST = "Score does not exist.";

    @Autowired
    public ReplayServiceImpl(ReplayRepository replayRepo, ScoreRepository scoreRepo, PlayerRepository playerRepo) {
        this.replayRepo = replayRepo;
        this.scoreRepo = scoreRepo;
        this.playerRepo = playerRepo;
    }

    @Override
    public ServiceResponse<List<Replay>> getByScoreID(int scoreID) {
        ServiceResponse<List<Replay>> response = new ServiceResponse<>();

        if (response.isSuccess()) {

            Score score = scoreRepo.findById(scoreID).orElse(null);

            if (score == null) {
                response.addInvalidError(SCORE_DOES_NOT_EXIST + STOP_HACKING);
                return response;
            }

            List<Replay> replays = replayRepo.findByScoreID(scoreID);
            response.setValue(replays);

            if (replays.isEmpty()) {
                response.addNotFoundError("No replays found.");
            } else {
                for (Replay replay : replays) {
                    replay.setScore(score);
                }
                response.setValue(replays);
            }
        }

        return response;
    }

    @Override
    public ServiceResponse<Replay> create(Replay replay, int scoreID, String playerUsername) {
        ServiceResponse<Replay> response = new ServiceResponse<>();

        if (replay == null) {
            response.addInvalidError("Replay was not created. Replay was null.");
            return response;
        }

        replay.setUploadedOn(LocalDate.now());

        Validator validator = Validation.buildDefaultValidatorFactory()
                .getValidator();

        Set<ConstraintViolation<Replay>> errors = validator.validate(replay);
        if (errors.size() > 0) {
            throw new RuntimeException("ERR: Invalid replay");
        }

        Score score = scoreRepo.findById(scoreID).orElse(null);

        if (score == null) {
            response.addInvalidError(SCORE_DOES_NOT_EXIST + STOP_HACKING);
            return response;
        }

        if (!score.getPlayer().getUserName().equals(playerUsername)) {
            Player player = playerRepo.findByUserName(playerUsername);
            if (player == null || !player.isAdmin()) {
                response.addInvalidError(NOT_ADMIN + STOP_HACKING);
                return response;
            }
        }

        int totalReplays = replayRepo.findByScoreID(scoreID).size();

        if (totalReplays >= MAX_REPLAYS) {
            response.addInvalidError("Only " + MAX_REPLAYS + " allowed.");
            return response;
        }

        if (response.isSuccess()) {
            replay.setScore(score);
            replay = replayRepo.saveAndFlush(replay);
            response.setValue(replay);
        }

        return response;
    }

    @Transactional
    @Override
    public ServiceResponse<Replay> delete(int ID, String playerUsername) {
        ServiceResponse<Replay> response = new ServiceResponse<>();

        Replay replay = replayRepo.findById(ID).orElse(null);
        if (replay == null) {
            response.addInvalidError("Replay not found.");
            return response;
        }

        Score score = replay.getScore();

        if (score == null) {
            response.addInvalidError(SCORE_DOES_NOT_EXIST + STOP_HACKING);
            return response;
        }

        if (!score.getPlayer().getUserName().equals(playerUsername)) {
            Player player = playerRepo.findByUserName(playerUsername);
            if (player == null || !player.isAdmin()) {
                response.addInvalidError(NOT_ADMIN + STOP_HACKING);
                return response;
            }
        }

        if (response.isSuccess()) {
            replayRepo.delete(replay);
            response.setValue(replay);
        }

        return response;
    }

}
