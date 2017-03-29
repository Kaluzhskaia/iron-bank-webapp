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
    UserRepository userRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    final String CLIENT_PSWD        = "user";
    final String CLIENT_USERNAME    = "user";
    final String MANAGER_PSWD       = "manager";
    final String MANAGER_USERNAME   = "manager";
    final String COLLECTOR_PSWD     = "collector";
    final String COLLECTOR_USERNAME = "collector";
    final String ADMIN_PSWD         = "admin";
    final String ADMIN__USERNAME    = "admin";

    @PostConstruct
    private void createRolesAndBuiltInUsers(){

        if ((long)0 == authorityRepository.count()){
            Authority authorityClint = new Authority();
            authorityClint.setName(AuthorityName.ROLE_CLIENT);
            Authority authorityManager = new Authority();
            authorityManager.setName(AuthorityName.ROLE_MANAGER);
            Authority authorityCollector = new Authority();
            authorityCollector.setName(AuthorityName.ROLE_MANAGER);
            Authority authorityAdmin = new Authority();
            authorityAdmin.setName(AuthorityName.ROLE_MANAGER);

            authorityRepository.save(authorityClint);
            authorityRepository.save(authorityManager );
            authorityRepository.save(authorityCollector);
            authorityRepository.save(authorityAdmin);
        }
        if (null == userRepository.findByUsername("user")){
            User user = new User();
            user.setUsername("user");
            String psswd = BCrypt.hashpw(CLIENT_PSWD, BCrypt.gensalt());
            user.setPassword(psswd);
            System.out.println("passwd is " + CLIENT_PSWD + " , encoded is + " + psswd);
            user.setEmail("user@user.com");
            user.setFirstName("User");
            user.setLastName("Userov");
            user.setImagePath("default-user.png");
            user.setEnabled(true);
            user.setBirthday(new Date(0));
            user.setLastPasswordResetDate(new Date(0));

            Authority userAuthority = authorityRepository.findByName(AuthorityName.ROLE_CLIENT);

            List<Authority> authoritiesList = new ArrayList<>();
            authoritiesList.add(userAuthority);

            user.setAuthorities(authoritiesList);

            userRepository.save(user);

        }
    }
}
