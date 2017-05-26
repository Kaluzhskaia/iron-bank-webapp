package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Created by Mikhail Falaleev on 05.05.2017.
 */

@Service
public class Scheduler {

    @Autowired
    CollectorMissionsManager collectorMissionsManager;

    @Scheduled(cron="*/15 * * * * ?")
    public void test(){
        System.out.println("Scheduler execute at " + (new Date().toString()));
        collectorMissionsManager.createTasksForCollectorsIfNecessary();

    }
}
