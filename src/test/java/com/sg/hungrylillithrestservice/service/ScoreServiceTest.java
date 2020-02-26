/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.service;

import com.sg.hungrylillithrestservice.model.Platform;
import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.time.LocalDate;
import java.util.List;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;
import org.junit.Rule;
import org.junit.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author Marcus
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class ScoreServiceTest {

    private static final LocalDate NOW = LocalDate.now();

    @Autowired
    private ScoreService service;
    @Autowired
    private ReplayService replayService;

    public ScoreServiceTest() {
    }

    /**
     * Test of findAll method, of class ScoreService.
     */
    @Test
    public void testFindAll() {
        boolean expResult = true;
        ServiceResponse<List<Score>> result = service.findAll();
        assertEquals(expResult, result.isSuccess());
    }

    /**
     * Test of findTopByPage method, of class ScoreService.
     */
    @Test
    public void testFindTopByPage() {
        int page = 0;
        int pageSize = 20;
        ServiceResponse<List<Score>> result = service.findTopByPage(page, pageSize);
        assertEquals(4, result.getValue().size());
        assertTrue(result.getValue().get(0).getValue() > result.getValue().get(1).getValue());

        page = 1;
        pageSize = 5;
        result = service.findTopByPage(page, pageSize);
        assertEquals(0, result.getValue().size());
    }

    /**
     * Test of findNewByPage method, of class ScoreService.
     */
    @Test
    public void testFindNewByPage() {
        int page = 0;
        int pageSize = 20;
        boolean approved = false;
        ServiceResponse<List<Score>> result = service.findNewByPage(page, pageSize, approved);
        assertEquals(17, result.getValue().size());
        assertFalse(result.getValue().get(0).isApproved());
        assertTrue(result.getValue().get(0).getAchievedOn().compareTo(result.getValue().get(1).getAchievedOn()) >= 0);

        page = 1;
        pageSize = 5;
        result = service.findNewByPage(page, pageSize, approved);
        assertEquals(5, result.getValue().size());
        assertFalse(result.getValue().get(0).isApproved());
        assertTrue(result.getValue().get(0).getAchievedOn().compareTo(result.getValue().get(1).getAchievedOn()) >= 0);

        page = 0;
        pageSize = 5;
        approved = true;
        result = service.findNewByPage(page, pageSize, approved);
        assertEquals(4, result.getValue().size());
        assertTrue(result.getValue().get(0).isApproved());
        assertTrue(result.getValue().get(0).getAchievedOn().compareTo(result.getValue().get(1).getAchievedOn()) >= 0);
    }

    /**
     * Test of create method, of class ScoreService.
     */
    @Transactional
    @Test
    public void testCreateDelete() {
        Score score = null;
        ServiceResponse<Score> result = service.create(score);
        assertFalse(result.isSuccess());

        score = new Score();

        try {
            result = service.create(score);
            fail();
        } catch (RuntimeException ex) {
        }

        Platform platform = new Platform();
        platform.setID(1);
        score.setPlatform(platform);

        Player player = new Player();

        player.setID(1);
        player.setUserName("admin");

        score.setPlayer(player);

        score.setAchievedOn(NOW);
        score.setApproved(false);
        score.setValue(100);

        result = service.create(score);

        int deleteThisID = result.getValue().getID();

        assertEquals(score, result.getValue());

        result = service.create(score);

        assertFalse(result.isSuccess());

        service.delete(deleteThisID);
    }

    /**
     * Test of approve method, of class ScoreService.
     */
    @Test
    public void testApprove() {
        int ID = 1;
        ServiceResponse<Score> expResult = null;
        ServiceResponse<Score> result = service.approve(ID, "admin");
        assertTrue(result.isSuccess());

        ID = 500;
        expResult = null;
        result = service.approve(ID, "admin");
        assertFalse(result.isSuccess());

        ID = 1;
        expResult = null;
        result = service.approve(ID, "firstuser");
        assertFalse(result.isSuccess());
    }
}
