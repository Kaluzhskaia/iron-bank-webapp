package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.questboat.model.Loan;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */
public interface LoanRepositrory extends JpaRepository<Loan, Long> {
}
