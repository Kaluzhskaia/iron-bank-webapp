package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.questboat.model.User;
import ru.questboat.repository.UserRepository;

/**
 * Created by Mikhail Falaleev on 28.03.2017.
 */

@Service
public class UserManagerImp implements UserManager {

    @Autowired
    UserRepository userRepository;



    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByUsernameOrEmail(String username, String email){
        return userRepository.findByUsernameOrEmail(username, email);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
