package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.questboat.model.Loan;
import ru.questboat.repository.LoanRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 07.05.2017.
 */

@Service
public class CollectorMissionsManagerImpl implements CollectorMissionsManager {


    @Autowired
    LoanRepository loanRepository;

    @Override
    public void createTasksForCollectorsIfNecessary() {
        List<Loan> loanList = loanRepository.findAll();
        loanList.forEach(loan->
        {
            long timePassed = (new Date()).getTime() - loan.getIssueDate().getTime();
            long periodsPassed = timePassed / periodTime;
            long haveToPay = (long)(loan.getLoanRequest().getAmount() * interestRate);
            long onePeriodPay = haveToPay / periods;
            long haveToPayAtTheMoment = periodsPassed * onePeriodPay;
            if (loan.getPayed() < haveToPayAtTheMoment - onePeriodPay * 3){
                System.out.println("Loan Id:" + loan.getId() + ". Kill");
            }
            else if (loan.getPayed() < haveToPayAtTheMoment - onePeriodPay * 2){
                System.out.println("Loan Id:" + loan.getId() + ". Mutilation");
            }
            else if (loan.getPayed() < haveToPayAtTheMoment - onePeriodPay){
                System.out.println("Loan Id:" + loan.getId() + ". MORAL_PRESSURE");
            }
        });
    }
}
