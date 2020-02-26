/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.dao;

import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.model.Role;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.validation.ConstraintViolationException;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.fail;
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
public class PlayerRepositoryTest {

    @Autowired
    private PlayerRepository repo;

    @Autowired
    public PlayerRepositoryTest() {
    }

    @Test
    public void testFindAll() {
        List<Player> actual = repo.findAll();
        assertEquals(2, actual.size());
    }

    @Test
    public void testFindById() {
        Player player = repo.findById(1).orElse(null);
        assertNotNull(player);

        player = repo.findById(500).orElse(null);
        assertNull(player);
    }

    @Test
    public void testCreate() {
        Player player = new Player();
        
        try{
            player = repo.saveAndFlush(player);
            fail();
        }catch(ConstraintViolationException ex){
        } catch(Exception ex){
            fail();
        }

        List<Role> roles = new ArrayList<>();
        player.setEmail("this@email.com");
        player.setEnabled(true);
        player.setJoinDate(LocalDate.now());
        player.setPassword("password");
        player.setRoles(roles);
        player.setUserName("playerplayer");
        player = repo.saveAndFlush(player);

        Player actual = repo.findById(player.getID())
                .orElse(null);

        assertNotNull(actual);
        repo.deleteById(player.getID());
    }

    /**
     * Test of findByUserName method, of class PlayerRepository.
     */
    @Test
    public void testFindByUserName() {
        Player actual = repo.findByUserName("admin");
        assertNotNull(actual);
        actual = repo.findByUserName("admin2");
        assertNull(actual);
    }
}
