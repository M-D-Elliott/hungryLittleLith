/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.service;

import com.sg.hungrylillithrestservice.model.Player;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


public interface PlayerService extends UserDetailsService {

    UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException;

    public ServiceResponse<Player> create(Player player);
    
    public ServiceResponse<Player> delete(int ID);
    
}
