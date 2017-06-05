package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.questboat.model.*;

import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@Repository
public interface CollectorMissionRepository extends JpaRepository<CollectorMission, Long> {
    List<CollectorMission> findByClientAndTypeAndStatus(User client, CollectorMissionType type, CollectorMissionStatus status);
    List<CollectorMission> findByClientAndTypeNotAndStatus(User client, CollectorMissionType type, CollectorMissionStatus status);
    List<CollectorMission> findByStatusOrCollector(CollectorMissionStatus status, User collector);
    List<CollectorMission> findByClientAndType(User client, CollectorMissionType type);
//    List<CollectorMission> findByClientAndTypeAndLoanRequest(User client, CollectorMissionType type, LoanRequest loanRequest);
}
