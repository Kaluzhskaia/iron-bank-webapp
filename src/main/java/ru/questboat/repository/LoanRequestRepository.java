package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.questboat.model.LoanRequest;
import ru.questboat.model.LoanRequestStatus;
import ru.questboat.model.User;

import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@Repository
public interface LoanRequestRepository extends JpaRepository<LoanRequest, Long> {
    List<LoanRequest> findByLoanRequestStatus(LoanRequestStatus loanRequestStatus);
    List<LoanRequest> findByClient(User user);
}
