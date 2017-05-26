package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.questboat.model.CollectorMission;
import ru.questboat.model.CollectorMissionStatus;
import ru.questboat.model.CollectorMissionType;
import ru.questboat.model.User;

import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@Repository
public interface CollectorMissionRepository extends JpaRepository<CollectorMission, Long> {
    List<CollectorMission> findByClientAndTypeAndStatus(User client, CollectorMissionType type, CollectorMissionStatus status);
    List<CollectorMission> findByClientAndTypeNotAndStatus(User client, CollectorMissionType type, CollectorMissionStatus status);
    List<CollectorMission> findByStatusOrCollector(CollectorMissionStatus status, User collector);
}
