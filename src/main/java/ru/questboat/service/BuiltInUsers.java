package ru.questboat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import ru.questboat.model.Authority;
import ru.questboat.model.AuthorityName;
import ru.questboat.model.User;
import ru.questboat.repository.AuthorityRepository;
import ru.questboat.repository.UserRepository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 28.03.2017.
 */

@Service
public class BuiltInUsers {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    private final String CLIENT_PSWD        = "client";
    private final String CLIENT_USERNAME    = "client";
    private final String MANAGER_PSWD       = "manager";
    private final String MANAGER_USERNAME   = "manager";
    private final String COLLECTOR_PSWD     = "collector";
    private final String COLLECTOR_USERNAME = "collector";
    private final String ADMIN_PSWD         = "admin";
    private final String ADMIN_USERNAME    = "admin";

    @PostConstruct
    private void createRolesAndBuiltInUsers(){

        if ((long)0 == authorityRepository.count()){
            Authority authorityClint = new Authority();
            authorityClint.setName(AuthorityName.ROLE_CLIENT);
            Authority authorityManager = new Authority();
            authorityManager.setName(AuthorityName.ROLE_MANAGER);
            Authority authorityCollector = new Authority();
            authorityCollector.setName(AuthorityName.ROLE_COLLECTOR);
            Authority authorityAdmin = new Authority();
            authorityAdmin.setName(AuthorityName.ROLE_ADMIN);

            authorityRepository.save(authorityClint);
            authorityRepository.save(authorityManager );
            authorityRepository.save(authorityCollector);
            authorityRepository.save(authorityAdmin);
        }
        if (null == userRepository.findByUsername(CLIENT_USERNAME)){
            addBuiltInUser(CLIENT_USERNAME, CLIENT_PSWD, AuthorityName.ROLE_CLIENT);
        }
        if (null == userRepository.findByUsername(MANAGER_USERNAME)){
            addBuiltInUser(MANAGER_USERNAME, MANAGER_PSWD, AuthorityName.ROLE_MANAGER);
        }
        if (null == userRepository.findByUsername(COLLECTOR_USERNAME)){
            addBuiltInUser(COLLECTOR_USERNAME, COLLECTOR_PSWD, AuthorityName.ROLE_COLLECTOR);
        }
        if (null == userRepository.findByUsername(ADMIN_USERNAME)){
            addBuiltInUser(ADMIN_USERNAME, ADMIN_PSWD, AuthorityName.ROLE_ADMIN);
        }



    }

    private void addBuiltInUser(String name, String passwd, AuthorityName authorityName ){
        User user = new User();
        user.setUsername(name);
        user.setPassword(BCrypt.hashpw(passwd, BCrypt.gensalt()));
        user.setEmail(String.format("%1$s@%1$s.com", name));
        user.setFirstName(name.substring(0, 1).toUpperCase()+name.substring(1));
        user.setLastName(name.substring(0, 1).toUpperCase()+name.substring(1) + "ov");
        user.setImagePath("default-client.png");
        user.setEnabled(true);
        user.setBirthday(new Date(788832000000L));
        user.setLastPasswordResetDate(new Date(0));
        user.setCity("SPb");

        Authority userAuthority = authorityRepository.findByName(authorityName);

        List<Authority> authoritiesList = new ArrayList<>();
        authoritiesList.add(userAuthority);

        user.setAuthorities(authoritiesList);

        userRepository.save(user);

    }
}
