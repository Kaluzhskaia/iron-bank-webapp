package ru.questboat.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.questboat.model.User;
import ru.questboat.service.UserManager;

import javax.mail.MessagingException;
import java.util.ArrayList;
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

//    @Autowired
//    MailService mailService;

//    @JsonView(View.SUMMARY.class)
    @RequestMapping(value = "/check-email-and-username", method = RequestMethod.POST)
    public ResponseEntity<?> isEmail(@RequestBody User muser){
//        System.out.println(muser.getEmail());
        User user = userManager.findByUsernameOrEmail(muser.getEmail(), muser.getUsername());
        if (null == user) {
            return ResponseEntity.ok(null);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Insert user in DB
//    @JsonView(View.SUMMARY.class)
    @RequestMapping(value = "/new-user", method = RequestMethod.POST)
    public User addUser(@RequestBody User user){
        System.out.println(user.getPassword());
        System.out.println(passwordEncoder.encode(user.getPassword()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setImagePath(IMAGE_PATH);
//        Mail mail = Mail.builder()
//                .to(user.getEmail())
//                .subject("Регистрация на sawpskill.ru")
//                .text(String.format("Привет %s, ты успешно зарегистрировался на swapskill.ru :)", user.getFirstName()))
//                .build();
//        try {
//            mailService.send(mail);
//        } catch (MessagingException ex){
//            ex.printStackTrace();
//            return userManager.save(user);
//        }
        return userManager.save(user);
    }


//    @Autowired
//    LoanRequstRepository loanRequstRepository;
//
//    @JsonView(View.SUMMARY.class)
//    @RequestMapping(value = "/loan", method = RequestMethod.POST)
//    public LoanRequest loan(@RequestBody LoanRequest loanRequest){
//        System.out.println(loanRequest.getAmount());
//        System.out.println(loanRequest.getGuarantor());
//        System.out.println(loanRequest.getIncome());
//        System.out.println(loanRequest.getPledge());
//        loanRequstRepository.save(loanRequest);
//        return null;
//    }
//
//    @JsonView(View.SUMMARY.class)
//    @RequestMapping(value="/loans", method = RequestMethod.GET)
//    public Iterable<LoanRequest> getAllUsers(){
//
//        return loanRequstRepository.findAll();
//    }




}