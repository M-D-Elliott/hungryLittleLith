/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.dao;

import com.sg.hungrylillithrestservice.model.Platform;
import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.model.Score;
import java.time.LocalDate;
import java.util.List;
import javax.validation.ConstraintViolationException;
import org.junit.Rule;
import org.junit.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author Marcus
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class ScoreRepositoryTest {

    private static final LocalDate NOW = LocalDate.now();

    @Autowired
    private ScoreRepository repo;

    public ScoreRepositoryTest() {
    }
    
    @Test
    public void testFindAll() {
        List<Score> actual = repo.findAll();
        assertEquals(21, actual.size());
    }

    @Test
    public void testFindById() {
        Score score = repo.findById(1).orElse(null);
        assertNotNull(score);

        score = repo.findById(500).orElse(null);
        assertNull(score);
    }

    @Test
    public void testCreate() {
        Score score = new Score();

        
        try{
            score = repo.saveAndFlush(score);
            fail();
        }catch(ConstraintViolationException ex){
        } catch(Exception ec){
            fail();
        }
        
        Platform platform = new Platform();
        platform.setID(1);
        score.setPlatform(platform);

        Player player = new Player();

        player.setID(1);

        score.setPlayer(player);

        score.setAchievedOn(NOW);
        score.setApproved(false);
        score.setValue(100);
        
        score = repo.saveAndFlush(score);

        Score actual = repo.findById(score.getID())
                .orElse(null);

        assertNotNull(actual);
        repo.deleteById(score.getID());
    }
    /**
     * Test of findTop method, of class ScoreRepository.
     */
    @Test
    public void testFindTopByPage() {
        Pageable pageable = PageRequest.of(0, 1, Sort.by("value"));
        List<Score> actual = repo.findTopByPage(pageable);
        assertTrue(actual.size() == 1);
        
        assertEquals(actual.get(0).getValue(), 200000);
    }

    /**
     * Test of findNewByPage method, of class ScoreRepository.
     */
    @Test
    public void testFindNewByPage() {
        Pageable pageable = PageRequest.of(0, 1, Sort.by("value"));
        List<Score> actual = repo.findNewByPage(pageable, true);
        assertTrue(actual.size() == 1);
        
        assertEquals(actual.get(0).getValue(), 200000);
        
        pageable = PageRequest.of(0, 1, Sort.by("value"));
        actual = repo.findNewByPage(pageable, false);
        assertTrue(actual.size() == 1);
        
        assertEquals(actual.get(0).getValue(), 120);
    }

    /**
     * Test of count method, of class ScoreRepository.
     */
    @Test
    public void testCount() {
        long result = repo.count();
        
        assertEquals(21, result);
    }
}
