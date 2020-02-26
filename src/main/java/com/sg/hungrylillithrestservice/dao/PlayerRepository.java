/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.dao;

import com.sg.hungrylillithrestservice.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Marcus
 */
@Repository
public interface PlayerRepository 
        extends JpaRepository<Player, Integer> {
    
    Player findByUserName(String userName);
}
