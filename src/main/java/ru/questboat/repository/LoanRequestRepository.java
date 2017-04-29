package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.questboat.model.LoanRequest;
import ru.questboat.model.LoanRequestStatus;

import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */
public interface LoanRequestRepository extends JpaRepository<LoanRequest, Long> {
    List<LoanRequest> findByLoanRequestStatus(LoanRequestStatus loanRequestStatus);
}
