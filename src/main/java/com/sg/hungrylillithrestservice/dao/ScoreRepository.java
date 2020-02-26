/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.hungrylillithrestservice.dao;

import com.sg.hungrylillithrestservice.model.Replay;
import com.sg.hungrylillithrestservice.model.Score;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Marcus
 */
@Repository
public interface ScoreRepository
        extends JpaRepository<Score, Integer> {

    @Query(value
            = "SELECT * "
            + "FROM Score s "
            + "INNER JOIN Player p "
            + "ON p.ID = s.player_ID "
            + "WHERE `approved` = true "
            + "ORDER BY `value` DESC ",
            nativeQuery = true)
    List<Score> findTopByPage(Pageable pageable);

    @Query(value
            = "SELECT * "
            + "FROM Score s "
            + "INNER JOIN Player p "
            + "ON p.ID = s.player_ID "
            + "WHERE s.approved = :approved "
            + "ORDER BY `achieved_on` ASC, "
            + "`value` DESC",
            nativeQuery = true)
    List<Score> findNewByPage(Pageable pageable, @Param("approved") boolean approved);

    @Query(value
            = "DELETE * "
            + "FROM Score s "
            + "WHERE s.player_ID = :ID",
            nativeQuery = true)
    List<Score> deleteAllByPlayerID(@Param("ID") int ID);

    @Query(value
            = "SELECT COUNT(*) "
            + "FROM Score s "
            + "WHERE s.approved = :approved ",
            nativeQuery = true)
    int count(@Param("approved") boolean approved);
}
