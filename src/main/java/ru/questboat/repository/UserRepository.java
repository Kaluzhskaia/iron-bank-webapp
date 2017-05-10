package ru.questboat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.questboat.model.User;

/**
 * Created by stephan on 20.03.16.
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByUsernameOrEmail(String username, String email);

}
