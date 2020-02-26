package com.sg.hungrylillithrestservice.service;

import static antlr.actions.csharp.ActionLexerTokenTypes.ID;
import com.sg.hungrylillithrestservice.dao.PlayerRepository;
import com.sg.hungrylillithrestservice.dao.ScoreRepository;
import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.model.Role;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private final PlayerRepository playerRepo;
    @Autowired
    private final ScoreRepository scoreRepo;
    @Autowired
    private final PasswordEncoder encoder;

    @Autowired
    public PlayerServiceImpl(PlayerRepository playerRepo, ScoreRepository scoreRepo, PasswordEncoder encoder) {
        this.playerRepo = playerRepo;
        this.scoreRepo = scoreRepo;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Player player = playerRepo.findByUserName(userName);
        if (player == null) {
            throw new UsernameNotFoundException(userName);
        }

        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        for (Role role : player.getRoles()) {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        }

        User user = new User(player.getUserName(), player.getPassword(), roles);

        return user;
    }

    @Transactional
    @Override
    public ServiceResponse<Player> create(Player player) {
        ServiceResponse<Player> response = new ServiceResponse<>();

        if (player == null) {
            response.addInvalidError("Player was not created.");
        } else {

            Validator validator = Validation.buildDefaultValidatorFactory()
                    .getValidator();

            Set<ConstraintViolation<Player>> errors = validator.validate(player);
            if (errors.size() > 0) {
                throw new RuntimeException("ERR: Invalid player.");
            }

            Player idExists = playerRepo.findById(player.getID()).orElse(null);
            Player userNameExists = playerRepo.findByUserName(player.getUserName());
            if (idExists != null) {
                response.addInvalidError("Player with that ID exists.");
            } if (userNameExists != null) {
                response.addInvalidError("Player with that username exists.");
            } 
            if(response.isSuccess()){
                player.isEnabled();
                player.setJoinDate(LocalDate.now());
                player.setPassword(encoder.encode(player.getPassword()));
                player = playerRepo.save(player);

                response.setValue(player);
            }
        }
        return response;
    }

    @Override
    public ServiceResponse<Player> delete(int ID) {
        ServiceResponse<Player> response = new ServiceResponse<>();

        Player player = playerRepo.findById(ID).orElse(null);
        if (player == null) {
            response.addInvalidError("Player not found.");
        }

        if (response.isSuccess()) {
            List<Score> scores = scoreRepo.deleteAllByPlayerID(ID);
            playerRepo.delete(player);
        }

        return response;
    }

}
