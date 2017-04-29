package ru.questboat.controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import ru.questboat.model.LoanRequest;
import ru.questboat.model.LoanRequestStatus;
import ru.questboat.model.User;
import ru.questboat.model.View;
import ru.questboat.repository.LoanRequestRepository;
import ru.questboat.service.LoanRequestManager;
import ru.questboat.service.UserManager;
import ru.questboat.service.jwt.JwtTokenUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@RestController
@RequestMapping(value = "/api")
public class LoanRequestController {

    @Autowired
    LoanRequestManager loanRequestManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserManager userManager;


    @RequestMapping(value = "/loan-request", method = RequestMethod.POST)
    public ResponseEntity<?> newLoanRequest(@RequestBody LoanRequest loanRequest, @RequestHeader("Authorization") String token){

        String username = jwtTokenUtil.getUsernameFromToken(token);
        loanRequest.setClient(userManager.findByUsername(username));
        if (null != loanRequestManager.save(loanRequest)) {
            return ResponseEntity.ok(null);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @Autowired
    LoanRequestRepository loanRequestRepository;

//    @JsonView(View.Summary.class)
    @RequestMapping(value = "/loan-request/new", method = RequestMethod.GET)
    public List getAllNewLoanRequests(){
        return loanRequestRepository.findByLoanRequestStatus(LoanRequestStatus.NOT_REVIEWED);
    }

}
