/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.dao;

import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.model.Score;
import java.time.LocalDate;
import java.util.List;
import javax.validation.ConstraintViolationException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
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
public class ReplayRepositoryTest {

    @Autowired
    private ReplayRepository repo;

    public ReplayRepositoryTest() {
    }

    @Test
    public void testFindAll() {
        List<Replay> actual = repo.findAll();
        assertEquals(5, actual.size());
    }

    @Test
    public void testFindById() {
        Replay replay = repo.findById(1).orElse(null);
        assertNotNull(replay);

        replay = repo.findById(500).orElse(null);
        assertNull(replay);
    }

    @Test
    public void testCreate() {
        Replay replay = new Replay();

        try{
            replay = repo.saveAndFlush(replay);
            fail();
        }catch(ConstraintViolationException ex){
        } catch(Exception ex){
            fail();
        }

        replay.setUrl("urlurlurlurl.com");

        Score score = new Score();
        score.setID(1);

        replay.setScore(score);

        replay.setUploadedOn(LocalDate.now());

        replay = repo.saveAndFlush(replay);

        Replay actual = repo.findById(replay.getID())
                .orElse(null);

        assertNotNull(actual);
        repo.deleteById(replay.getID());
    }

    /**
     * Test of findByScoreID method, of class ReplayRepository.
     */
    @Test
    public void testFindByScoreID() {
    }

    /**
     * Test of deleteAllByScoreID method, of class ReplayRepository.
     */
    @Test
    public void testDeleteAllByScoreID() {

    }
}
