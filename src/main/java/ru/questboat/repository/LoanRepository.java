package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.questboat.model.Loan;
import ru.questboat.model.LoanRequest;

import java.util.Collection;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByLoanRequestIn(Collection<LoanRequest> loanRequests);
    List<Loan> findByIsRepaid(boolean isRepaid);
}
