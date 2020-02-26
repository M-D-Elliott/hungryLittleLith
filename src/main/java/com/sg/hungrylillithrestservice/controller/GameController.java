package com.sg.hungrylillithrestservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

//@RequestMapping("/game")
@Controller
public class GameController {

    
    @GetMapping("/game/test")
    public String playGameTest(Model model) {
        return "/game/gameTest";
    }
    
    @GetMapping("/game")
    public String playGame(Model model) {
        return "/game/gameTest";
    }
    
    @GetMapping("/")
    public String gameHome(Model model) {
        return "/game/gameTest";
    }

}
