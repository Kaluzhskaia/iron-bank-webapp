package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.questboat.model.LoanRequest;
import ru.questboat.model.LoanRequestStatus;
import ru.questboat.repository.LoanRequestRepository;

import java.util.Date;

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
}
