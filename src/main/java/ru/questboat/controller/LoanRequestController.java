package ru.questboat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.questboat.model.LoanRequest;
import ru.questboat.service.LoanRequestManager;
import ru.questboat.service.UserManager;
import ru.questboat.service.jwt.JwtTokenUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@RestController
@RequestMapping(value = "/api")
public class LoanRequestController {

    @Autowired
    private LoanRequestManager loanRequestManager;

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

//    @JsonView(View.Summary.class)
    @RequestMapping(value = "/loan-request", method = RequestMethod.GET)
    public List getAllNewLoanRequests(){

        System.out.println("Get new list");
        return loanRequestManager.findAll();
    }

    @RequestMapping(value = "/loan-request/{id}/{newStatus}", method = RequestMethod.GET)
    public ResponseEntity changeLoanRequestStatus(@PathVariable String newStatus, @PathVariable long id){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if (loanRequestManager.changeLoanStatus(id, newStatus))
            status = HttpStatus.OK;
        System.out.println("Refresh status");
        return new ResponseEntity(null, status);
    }

}
