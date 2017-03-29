package ru.questboat.service;

import ru.questboat.model.User;

/**
 * Created by Mikhail Falaleev on 28.03.2017.
 */
public interface UserManager {

    User save(User user);
    User findByUsernameOrEmail(String username, String email);
}
