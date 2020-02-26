package com.sg.hungrylillithrestservice.controller;

import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.ReplayServiceImpl;
import com.sg.hungrylillithrestservice.service.ScoreServiceImpl;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import com.sg.hungrylillithrestservice.view.ScoreViewResponse;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/score")
public class ScoreController {

    private final ScoreServiceImpl scoreService;
    private final ReplayServiceImpl replayService;

    private static final int PAGE_SIZE = 20;
    private static final int FIRST_PAGE_NUMBER = 0;

    @Autowired
    public ScoreController(ScoreServiceImpl scoreService, ReplayServiceImpl replayService) {
        this.scoreService = scoreService;
        this.replayService = replayService;
    }

    @GetMapping("/top/page/{pageNumber}")
    public String viewTop(Model model, @PathVariable int pageNumber) {
        ServiceResponse<List<Score>> response = scoreService.findTopByPage(pageNumber, PAGE_SIZE);

        List<Score> scores = response.getValue();

        List<ScoreViewResponse> scoresViewResponse
                = scores.stream()
                        .map(s -> new ScoreViewResponse(s, false))
                        .collect(Collectors.toList());

        model.addAttribute("scores", scoresViewResponse);
        model.addAttribute("title", "Top");
        model.addAttribute("pageID", "top");
        addPageData(model, pageNumber, true);
        return "/score/list";
    }

    @GetMapping("/top/")
    public String viewTop(Model model) {

        int pageNumber = FIRST_PAGE_NUMBER;

        ServiceResponse<List<Score>> response = scoreService.findTopByPage(pageNumber, PAGE_SIZE);

        List<Score> scores = response.getValue();

        List<ScoreViewResponse> scoresViewResponse
                = scores.stream()
                        .map(s -> new ScoreViewResponse(s, false))
                        .collect(Collectors.toList());

        model.addAttribute("scores", scoresViewResponse);
        model.addAttribute("title", "Top");
        model.addAttribute("pageID", "top");
        addPageData(model, pageNumber, true);
        return "/score/list";
    }

    @GetMapping("/new/{approved}/page/{pageNumber}")
    public String viewNew(Model model, @PathVariable int pageNumber, @PathVariable boolean approved) {
        ServiceResponse<List<Score>> response = scoreService.findNewByPage(pageNumber, PAGE_SIZE, approved);

        List<Score> scores = response.getValue();

        List<ScoreViewResponse> scoresViewResponse
                = scores.stream()
                        .map(s -> new ScoreViewResponse(s, false))
                        .collect(Collectors.toList());

        model.addAttribute("scores", scoresViewResponse);
        model.addAttribute("title", "New " + addApprovedString(approved));
        model.addAttribute("pageID", "new/" + Boolean.toString(approved));
        addPageData(model, pageNumber, approved);
        return "/score/list";
    }

    @GetMapping("/new/{approved}")
    public String viewNew(Model model, @PathVariable boolean approved) {

        int pageNumber = FIRST_PAGE_NUMBER;

        ServiceResponse<List<Score>> response = scoreService.findNewByPage(pageNumber, PAGE_SIZE, approved);

        List<Score> scores = response.getValue();

        List<ScoreViewResponse> scoresViewResponse
                = scores.stream()
                        .map(s -> new ScoreViewResponse(s, false))
                        .collect(Collectors.toList());

        model.addAttribute("scores", scoresViewResponse);
        model.addAttribute("title", "New " + addApprovedString(approved));
        model.addAttribute("pageID", "new/" + Boolean.toString(approved));
        addPageData(model, pageNumber, approved);
        return "/score/list";
    }

    private String addApprovedString(boolean approved) {
        return (approved) ? "approved" : "unapproved";
    }

    private void addPageData(Model model, int pageNumber, boolean approved) {
        model.addAttribute("pageNumber", pageNumber);
        model.addAttribute("isLastPage", scoreService.count(approved) <= (pageNumber + 1) * PAGE_SIZE);
    }
}
