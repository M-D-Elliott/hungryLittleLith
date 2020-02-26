/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.dao;

import com.sg.hungrylillithrestservice.model.Replay;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Marcus
 */
@Repository
public interface ReplayRepository
        extends JpaRepository<Replay, Integer> {

    List<Replay> findByScoreID(int ID);

    @Modifying
    @Transactional
    @Query(value
            = "DELETE * "
            + "FROM Replay r "
            + "WHERE r.score_id = :ID",
            nativeQuery = true)
    List<Replay> deleteAllByScoreID(@Param("ID") int ID);

}
