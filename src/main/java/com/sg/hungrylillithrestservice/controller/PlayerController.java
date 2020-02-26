package com.sg.hungrylillithrestservice.controller;

import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.PlayerService;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import com.sg.hungrylillithrestservice.view.ScoreViewResponse;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

//@Controller
//@RequestMapping("/player")
//public class PlayerController {
//    
//    private final PlayerService playerService;
//
//    private static final int PAGE_SIZE = 20;
//
//    public PlayerController(PlayerService playerService) {
//        this.playerService = playerService;
//    }
//    
//    @GetMapping("/sort/alphabetical/{pageNumber}")
//    public String viewAlpha(Model model, @PathVariable int pageNumber) {
//        ServiceResponse<List<Player>> response = playerService.findAllAlphabetical(pageNumber);
//
//        List<Player> Players = response.getValue();
//
//        List<PlayerViewResponse> PlayersViewResponse
//                = Players.stream()
//                        .map(s -> new PlayerViewResponse(s, false))
//                        .collect(Collectors.toList());
//
//        return "/Player/list";
//    }
//    
//    @GetMapping("/sort/alphabetical")
//    public String viewAlpha(Model model) {
//        ServiceResponse<List<Player>> response = playerService.findAllAlphabetical(0);
//
//        List<Player> Players = response.getValue();
//
//        List<PlayerViewResponse> PlayersViewResponse
//                = Players.stream()
//                        .map(s -> new PlayerViewResponse(s, false))
//                        .collect(Collectors.toList());
//
//        return "/Player/list";
//    }
//}

//