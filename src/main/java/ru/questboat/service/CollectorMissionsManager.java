package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import ru.questboat.model.CollectorMission;
import ru.questboat.model.Loan;
import ru.questboat.repository.LoanRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 07.05.2017.
 */
public interface CollectorMissionsManager extends ConstantsForLoans {


    void createTasksForCollectorsIfNecessary();
    List<CollectorMission> getAllActualAndMineMissions(String username);
    boolean acceptMission(String collectorUsername, Long collectorMissionId);
    boolean completeMission(String collectorUsername, Long collectorMissionId, String report);
    boolean checkMission(Long collectorMissionId);
    List<CollectorMission> getAllMissions();

}
