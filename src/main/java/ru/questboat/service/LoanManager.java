package ru.questboat.service;

import ru.questboat.model.Loan;
import ru.questboat.model.LoanRequest;

import java.util.List;

/**
 * Created by Mikhail Falaleev on 07.05.2017.
 */
public interface LoanManager extends ConstantsForLoans {

    Loan createNewLoan(LoanRequest loanRequest);
    List<Loan> findAll();
    List<Loan> findByClient(String clientUsername);
    float getShouldPayed(long loanId);
    void pay(long loanId, long pay);


}
