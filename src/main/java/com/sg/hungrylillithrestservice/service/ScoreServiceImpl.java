package com.sg.hungrylillithrestservice.service;

import static antlr.actions.csharp.ActionLexerTokenTypes.ID;
import com.sg.hungrylillithrestservice.dao.PlayerRepository;
import com.sg.hungrylillithrestservice.dao.ReplayRepository;
import com.sg.hungrylillithrestservice.dao.ScoreRepository;
import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ScoreServiceImpl implements ScoreService {

    private static final int MAX_SCORE_REQUEST = 1000;
    private static final int MIN_SCORE_REQUEST = 1;

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private ReplayRepository replayRepository;

    @Autowired
    private PlayerRepository playerRepo;

    public ScoreServiceImpl(ScoreRepository scoreRepository, ReplayRepository replayRepository, PlayerRepository playerRepo) {
        this.scoreRepository = scoreRepository;
        this.replayRepository = replayRepository;
        this.playerRepo = playerRepo;
    }

    @Override
    public ServiceResponse<List<Score>> findAll() {
        ServiceResponse response = new ServiceResponse<>();

        List<Score> scores = scoreRepository.findAll();

        if (scores.isEmpty()) {
            response.addNotFoundError("No scores found.");
        }

        response.setValue(scores);

        return response;
    }

    @Override
    public ServiceResponse<List<Score>> findTopByPage(int page, int pageSize) {
        ServiceResponse<List<Score>> response = new ServiceResponse<>();

        if (response.isSuccess()) {
            Pageable pageable = PageRequest.of(page, pageSize, Sort.by("value"));

            List<Score> scores = scoreRepository.findTopByPage(pageable);

            if (scores.isEmpty()) {
                response.addNotFoundError("No scores found.");
            }
            response.setValue(scores);
        }

        return response;
    }

    @Override
    public ServiceResponse<List<Score>> findNewByPage(int page, int pageSize, boolean approved) {
        ServiceResponse<List<Score>> response = new ServiceResponse<>();

        if (response.isSuccess()) {
            Pageable pageable = PageRequest.of(page, pageSize, Sort.by("value"));

            List<Score> scores = scoreRepository.findNewByPage(pageable, approved);
            response.setValue(scores);

            if (scores.isEmpty()) {
                response.addNotFoundError("No scores found.");
            } else {
                response.setValue(scores);
            }
        }

        return response;
    }

    @Override
    public ServiceResponse<Score> create(Score score) {

        ServiceResponse<Score> response = new ServiceResponse<>();

        if (score == null) {
            response.addInvalidError("Score was not created.");
            return response;
        }

        Validator validator = Validation.buildDefaultValidatorFactory()
                .getValidator();

        Set<ConstraintViolation<Score>> errors = validator.validate(score);
        if (errors.size() > 0) {
            throw new RuntimeException("ERR: Invalid Score.");
        }

        Score exists = scoreRepository.findById(score.getID()).orElse(null);

        if (exists != null) {
            response.addInvalidError("Score with that ID exists.");
            return response;
        }

        Player player = playerRepo.findByUserName(score.getPlayer().getUserName());

        if (player == null) {
            response.addInvalidError("Player with that username does not exist. Stop hacking my site!!!");
            return response;
        }

        if (response.isSuccess()) {
            score.setApproved(false);
            score.setPlayer(player);
            score = scoreRepository.save(score);

            response.setValue(score);
        }

        return response;
    }

    @Override
    public ServiceResponse<Score> approve(int ID, String playerUsername) {
        ServiceResponse<Score> response = new ServiceResponse<>();

        Score score = scoreRepository.findById(ID).orElse(null);
        if (score == null) {
            response.addInvalidError("Score not found.");
            return response;
        }

        Player player = playerRepo.findByUserName(playerUsername);
        if (player == null || !player.isAdmin()) {
            response.addInvalidError("You are not an admin. Stop hacking my site!");
            return response;
        }

        if (response.isSuccess()) {
            score.setApproved(true);
            score = update(score);
            response.setValue(score);
        }

        return response;
    }

    @Transactional
    @Override
    public ServiceResponse<Score> delete(int ID) {
        ServiceResponse<Score> response = new ServiceResponse<>();

        Score score = scoreRepository.findById(ID).orElse(null);
        if (score == null) {
            response.addInvalidError("Score not found.");
        }

        if (response.isSuccess()) {
            response.setValue(score);
            List<Replay> replays = replayRepository.findAll();
            if(replays.size() > 0){
                replayRepository.deleteAll(replays);
            }
            scoreRepository.delete(score);
        }

        return response;
    }

    @Override
    public int count(boolean approved) {
        return scoreRepository.count(approved);
    }

    private Score update(Score score) {
        score = scoreRepository.save(score);
        return score;
    }
}
