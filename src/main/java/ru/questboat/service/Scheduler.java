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

    @Scheduled(cron="0 * * * * ?")
    public void test(){
        int count = 0;
        System.out.println("SchedulerCalculate. " + count++ + ". Execute at " + (new Date().toString()));
        collectorMissionsManager.createTasksForCollectorsIfNecessary();

    }
}
