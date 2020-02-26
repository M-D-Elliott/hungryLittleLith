/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.service;

import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.model.Score;
import com.sg.hungrylillithrestservice.service.response.ServiceResponse;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;


public interface ScoreService {

    ServiceResponse<Score> approve(int ID, String playerUsername);

    ServiceResponse<Score> create(Score score);

    @Transactional
    ServiceResponse<Score> delete(int ID);

    ServiceResponse<List<Score>> findAll();

    ServiceResponse<List<Score>> findNewByPage(int page, int pageSize, boolean approved);

    ServiceResponse<List<Score>> findTopByPage(int page, int pageSize);
    
    int count(boolean approved);
    
}
