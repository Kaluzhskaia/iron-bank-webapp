package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.questboat.model.LoanRequest;
import ru.questboat.model.LoanRequestStatus;
import ru.questboat.repository.LoanRequestRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */
@Service
public class LoanRequestManagerImp implements LoanRequestManager {


    @Autowired
    LoanRequestRepository loanRequestRepository;

    @Override
    public LoanRequest save(LoanRequest loanRequest) {
        loanRequest.setRequestTime(new Date());
        loanRequest.setLoanRequestStatus(LoanRequestStatus.NOT_REVIEWED);
        return loanRequestRepository.save(loanRequest);
    }

    @Override
    public List<LoanRequest> findAll() {
         return loanRequestRepository.findAll();
    }

    @Override
    public boolean changeLoanStatus(long id, String newStatus){
        LoanRequest loanRequest;
        loanRequest = loanRequestRepository.findOne(id);
        switch (newStatus){
            case ("approve"):
                loanRequest.setLoanRequestStatus(LoanRequestStatus.APPROVED);
                break;
            case ("reject"):
                loanRequest.setLoanRequestStatus(LoanRequestStatus.REJECTED);
                break;
            case ("loan-issue"):
                loanRequest.setLoanRequestStatus(LoanRequestStatus.LOAN_ISSUED);
                break;
            default:
                return false;

        }
        System.out.println("Status changed");
        return loanRequestRepository.save(loanRequest) != null;
        }
}
