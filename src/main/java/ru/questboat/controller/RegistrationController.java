package ru.questboat.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.questboat.model.Authority;
import ru.questboat.model.AuthorityName;
import ru.questboat.model.User;
import ru.questboat.repository.AuthorityRepository;
import ru.questboat.service.UserManager;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 06.12.2016.
 */


@RestController
@RequestMapping(value = "/registration")
public class RegistrationController {
    private final String IMAGE_PATH = "no-avatar.png";

    @Autowired
    UserManager userManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityRepository authorityRepository;

    @RequestMapping(value = "/check-email-and-username", method = RequestMethod.POST)
    public ResponseEntity<?> isEmail(@RequestBody User muser){
        User user = userManager.findByUsernameOrEmail(muser.getEmail(), muser.getUsername());
        if (null == user) {
            return ResponseEntity.ok(null);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/new-client", method = RequestMethod.POST)
    public User addUser(@RequestBody User user){
        System.out.println(user.getPassword());
        System.out.println(passwordEncoder.encode(user.getPassword()));
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        user.setImagePath(IMAGE_PATH);
        user.setEnabled(true);
        user.setLastPasswordResetDate(new Date(System.currentTimeMillis()));
        Authority authorityClint = authorityRepository.findByName(AuthorityName.ROLE_CLIENT);
        authorityClint.setName(AuthorityName.ROLE_CLIENT);
        List<Authority> authoritiesList = new ArrayList<>();
        authoritiesList.add(authorityClint);
        user.setAuthorities(authoritiesList);
        return userManager.save(user);
    }




}