/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.service;

import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.util.List;
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
public class ReplayServiceTest {

    @Autowired
    private ReplayService service;

    private ScoreService scoreService;

    @Autowired
    public ReplayServiceTest() {
    }

    /**
     * Test of getByScoreID method, of class ReplayService.
     */
    @Test
    public void testGetByScoreID() {
        ServiceResponse<List<Replay>> result = service.getByScoreID(1);
        assertEquals(1, result.getValue().size());

        result = service.getByScoreID(10000);
        assertFalse(result.isSuccess());

        result = service.getByScoreID(4);
        assertFalse(result.isSuccess());
    }

    /**
     * Test of create method, of class ReplayService.
     */
    @Test
    public void testCreateDelete() {
        Replay replay = null;
        ServiceResponse<Replay> result = service.create(replay, 1, "admin");
        assertFalse(result.isSuccess());

        replay = new Replay();

        replay.setUrl(null);
        try{
            result = service.create(replay, 1, "admin");
            fail();
        }catch(RuntimeException ex){
        }
        
        replay.setUrl("1234567891011.com");
        result = service.create(replay, 10000, "admin");
        assertFalse(result.isSuccess());

        result = service.create(replay, 2, "firstUser");
        assertFalse(result.isSuccess());


        result = service.create(replay, 2, "admin");
        assertFalse(result.isSuccess());
        String message = result.getMessages().get(0);
        assertTrue("Only 4 allowed.".equals(message));

        result = service.create(replay, 1, "admin");
        int deleteThisID = result.getValue().getID();
        assertEquals(replay.getUrl(), result.getValue().getUrl());
        service.delete(deleteThisID, "admin");

        result = service.delete(10000, "admin");
        assertFalse(result.isSuccess());

        result = service.delete(1, "firstUser");
        assertFalse(result.isSuccess());
        message = result.getMessages().get(0);
        assertTrue("You are not an admin. Stop hacking my site!".equals(message));
    }

}
