package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.questboat.model.LoanRequest;
import ru.questboat.model.LoanRequestStatus;
import ru.questboat.model.User;
import ru.questboat.repository.LoanRequestRepository;
import ru.questboat.repository.UserRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */
@Service
public class LoanRequestManagerImp implements LoanRequestManager {


    @Autowired
    LoanRequestRepository loanRequestRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LoanManager loanManager;


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
    public boolean changeLoanStatus(long loanRequestId, String newStatus, String managerUsername){
        User manager = userRepository.findByUsername(managerUsername);
        LoanRequest loanRequest;
        loanRequest = loanRequestRepository.findOne(loanRequestId);
        switch (newStatus){
            case ("approve"):
                if (loanRequest.getLoanRequestStatus() == LoanRequestStatus.NOT_REVIEWED)
                    loanRequest.setLoanRequestStatus(LoanRequestStatus.APPROVED);
                else
                    return false;
                loanRequest.setManager(manager);
                break;
            case ("reject"):
                if (loanRequest.getLoanRequestStatus() == LoanRequestStatus.NOT_REVIEWED)
                    loanRequest.setLoanRequestStatus(LoanRequestStatus.REJECTED);
                else
                    return false;
                loanRequest.setManager(manager);
                break;
            case ("loan-issue"):
                if (loanRequest.getLoanRequestStatus() == LoanRequestStatus.APPROVED) {
                    if (null != loanManager.createNewLoan(loanRequest))
                        loanRequest.setLoanRequestStatus(LoanRequestStatus.LOAN_ISSUED);
                }
                else
                    return false;
                break;
            default:
                return false;

        }
        return loanRequestRepository.save(loanRequest) != null;
        }

    @Override
    public List<LoanRequest> findByClientUsername(String username) {
        User client = userRepository.findByUsername(username);
        return loanRequestRepository.findByClient(client);
    }
}
