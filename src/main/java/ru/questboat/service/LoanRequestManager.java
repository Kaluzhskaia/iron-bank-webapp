package ru.questboat.service;

import ru.questboat.model.LoanRequest;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */
public interface LoanRequestManager {
    public LoanRequest save(LoanRequest loanRequest);
}
