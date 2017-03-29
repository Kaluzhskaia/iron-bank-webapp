package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.questboat.model.Authority;
import ru.questboat.model.AuthorityName;
import ru.questboat.model.User;

/**
 * Created by Mikhail Falaleev on 28.03.2017.
 */
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(AuthorityName authorityName);
}
