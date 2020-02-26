package com.sg.hungrylillithrestservice.controller;

import com.sg.hungrylillithrestservice.controller.request.RegisterPlayerRequest;
import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.service.PlayerService;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import javax.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {

    private final PlayerService playerService;

    public LoginController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/login")
    public String login() {
        return "player/login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("registerPlayerRequest", new RegisterPlayerRequest());
        return "player/register";
    }

    @PostMapping("/register")
    public String register(@Valid RegisterPlayerRequest request, BindingResult res, Model model) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            res.addError(new FieldError("registerPlayerRequest", "confirmPassword", "Confirm does not match password."));
        }

        if (!res.hasErrors()) {
            Player player = new Player(request);
            ServiceResponse<Player> response = playerService.create(player);
            if (!response.isSuccess()) {
                response.getMessages().forEach((error) -> {
                    res.addError(new FieldError("registerPlayerRequest", "userName", error));
                });
            }
        }
        if (res.hasErrors()) {
            model.addAttribute("registerPlayerRequest", request);
            return "player/register";
        }

        return "redirect:/login";
    }
}
