package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import ru.questboat.model.Loan;
import ru.questboat.repository.LoanRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 07.05.2017.
 */
public interface CollectorMissionsManager extends ConstantsForLoans {


    public void createTasksForCollectorsIfNecessary();
}
