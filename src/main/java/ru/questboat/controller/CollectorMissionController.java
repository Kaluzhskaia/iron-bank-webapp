package ru.questboat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.questboat.model.CollectorMission;
import ru.questboat.service.CollectorMissionsManager;
import ru.questboat.service.jwt.JwtTokenUtil;

import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@RestController
@RequestMapping(value = "/api")
public class CollectorMissionController {

    @Autowired
    CollectorMissionsManager collectorMissionsManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @RequestMapping(value = "/mission/actual-and-mine", method = RequestMethod.GET)
    public List<CollectorMission> getAllActualAndMineMissions(@RequestHeader("Authorization") String token){
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return collectorMissionsManager.getAllActualAndMineMissions(username);
    }

    @RequestMapping(value = "/mission/collector-accept/{missionId}", method = RequestMethod.GET)
    public ResponseEntity collectorAcceptMission(@RequestHeader("Authorization") String token, @PathVariable long missionId){
        String username = jwtTokenUtil.getUsernameFromToken(token);

        HttpStatus status = HttpStatus.BAD_REQUEST;
        if (collectorMissionsManager.acceptMission(username, missionId))
            status = HttpStatus.OK;
        return new ResponseEntity(null, status);
    }
}
