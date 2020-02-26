/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.service;

import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.time.LocalDate;
import org.junit.Test;
import org.junit.Rule;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author Marcus
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class PlayerServiceTest {

    @Autowired
    private PlayerService service;

    @Autowired
    public PlayerServiceTest() {
    }

    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    /**
     * Test of loadUserByUsername method, of class PlayerService.
     */
    @Test
    public void testLoadUserByUsername() {
        String userName = "JohnnyNotInDB";
        exceptionRule.expect(UsernameNotFoundException.class);
        service.loadUserByUsername(userName);
        exceptionRule = ExpectedException.none();

        userName = "admin";
        UserDetails user = service.loadUserByUsername(userName);
        assertEquals(user.getUsername(), "admin");

        assertTrue(user.getAuthorities().size() > 0);

        Object authority = user.getAuthorities().toArray()[0];
        assertEquals("ROLE_USER", authority);

    }

    /**
     * Test of create method, of class PlayerService.
     */
    @Test
    public void testCreateDelete() {
        Player Player = null;
        ServiceResponse<Player> result = service.create(Player);
        assertFalse(result.isSuccess());
        
        result = service.delete(10000);
        assertFalse(result.isSuccess());

        Player player = new Player();
        exceptionRule.expect(RuntimeException.class);
        result = service.create(Player);
        exceptionRule = ExpectedException.none();

        player.setEmail("1234email.com");
        exceptionRule.expect(RuntimeException.class);
        result = service.create(Player);
        exceptionRule = ExpectedException.none();

        player.setEmail("1234@email.com");
        result = service.create(Player);
        player.setID(1);
        assertFalse(result.isSuccess());
        
        player.setEmail("1234@email.com");
        result = service.create(Player);
        player.setID(0);
        player.setUserName("admin");
        assertFalse(result.isSuccess());
        
        player.setEmail("1234@email.com");
        player.setJoinDate(LocalDate.now());
        player.setUserName("new user");
        result = service.create(Player);

        int deleteThisID = result.getValue().getID();

        assertEquals(Player, result.getValue());

        result = service.create(Player);

        assertFalse(result.isSuccess());

        service.delete(deleteThisID);
        // TODO review the generated test code and remove the default call to fail.
    }

}
