/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.service;

import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;


public interface ReplayService {

    ServiceResponse<Replay> create(Replay replay, int scoreID, String playerUsername);

    @Transactional
    ServiceResponse<Replay> delete(int ID, String playerUsername);

    ServiceResponse<List<Replay>> getByScoreID(int scoreID);
    
}
