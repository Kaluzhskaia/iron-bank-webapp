package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.questboat.model.Loan;
import ru.questboat.model.LoanRequest;
import ru.questboat.model.User;
import ru.questboat.repository.LoanRepository;
import ru.questboat.repository.LoanRequestRepository;
import ru.questboat.repository.UserRepository;

import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 07.05.2017.
 */

@Service
public class LoanManagerImpl implements LoanManager {

    @Autowired
    LoanRepository loanRepository;

    @Autowired
    LoanRequestRepository loanRequestRepository;

    @Autowired
    UserRepository userRepository;
    
    @Override
    public Loan createNewLoan(LoanRequest loanRequest) {
        Loan loan = new Loan();
        loan.setLoanRequest(loanRequest);
        loan.setIssueDate(new Date());
        loan.setPeriodCount(periods);
        loan.setInterestRate(interestRate);
        loan.setRepaid(false);
        return loanRepository.save(loan);
    }


    @Override
    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    @Override
    public List<Loan> findByClient(String clientUsername) {
        User client = userRepository.findByUsername(clientUsername);
        List<LoanRequest> loanRequestList = loanRequestRepository.findByClient(client);
        return loanRepository.findByLoanRequestIn(loanRequestList);
    }
}
