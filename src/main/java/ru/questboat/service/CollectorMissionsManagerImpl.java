package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.questboat.model.*;
import ru.questboat.repository.CollectorMissionRepository;
import ru.questboat.repository.LoanRepository;
import ru.questboat.repository.UserRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 07.05.2017.
 */

@Service
public class CollectorMissionsManagerImpl implements CollectorMissionsManager {


    @Autowired
    LoanRepository loanRepository;

    @Autowired
    CollectorMissionRepository collectorMissionRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public void createTasksForCollectorsIfNecessary() {
        List<Loan> loanList = loanRepository.findByIsRepaid(false);
        loanList.forEach(loan->
        {
            long timePassed = (new Date()).getTime() - loan.getIssueDate().getTime();
            long periodsPassed = timePassed / periodTime;
            long haveToPay = (long)(loan.getLoanRequest().getAmount() * interestRate);
            long onePeriodPay = haveToPay / periods;
            long haveToPayAtTheMoment = periodsPassed * onePeriodPay;
            if (loan.getPayed() < haveToPayAtTheMoment - onePeriodPay * 3){
                checkAndCreateIfNecessary(loan, CollectorMissionType.KILLING);
            }
            else if (loan.getPayed() < haveToPayAtTheMoment - onePeriodPay * 2){
                checkAndCreateIfNecessary(loan, CollectorMissionType.MUTILATION);
            }
            else if (loan.getPayed() < haveToPayAtTheMoment - onePeriodPay){
                checkAndCreateIfNecessary(loan, CollectorMissionType.MORAL_PRESSURE);
            }
        });
    }

    private void checkAndCreateIfNecessary(Loan loan, CollectorMissionType type){
        if ((collectorMissionRepository.findByClientAndTypeAndStatus
                (loan.getLoanRequest().getClient(), type, CollectorMissionStatus.ACTUAL)).size() == 0)
        {

            CollectorMission mission = new CollectorMission();
            mission.setClient(loan.getLoanRequest().getClient());
            mission.setStatus(CollectorMissionStatus.ACTUAL);
            mission.setType(type);

            collectorMissionRepository.save(mission);
            List<CollectorMission> noMoreActualMissionsList = collectorMissionRepository.findByClientAndTypeNotAndStatus(
                    loan.getLoanRequest().getClient(),
                    type,
                    CollectorMissionStatus.ACTUAL
            );
            noMoreActualMissionsList.forEach(aMission->
            {
                aMission.setStatus(CollectorMissionStatus.NON_ACTUAL);
                collectorMissionRepository.save(aMission);
            });
        }
    }

    @Override
    public List<CollectorMission> getAllActualAndMineMissions(String username) {
        User collector = userRepository.findByUsername(username);
        return collectorMissionRepository.findByStatusOrCollector(CollectorMissionStatus.ACTUAL, collector);
    }

    @Override
    public boolean acceptMission(String collectorUsername, Long collectorMissionId) {
        User collector = userRepository.findByUsername(collectorUsername);
        CollectorMission mission = collectorMissionRepository.findOne(collectorMissionId);
        if (mission.getStatus() == CollectorMissionStatus.ACTUAL){
            mission.setStatus(CollectorMissionStatus.IN_ACTION);
            mission.setCollector(collector);
            if (collectorMissionRepository.save(mission) != null)
                return true;
        }
        return false;
    }
}
