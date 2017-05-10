package ru.questboat.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
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

    @Value("${jwt.header}")
    private String tokenHeader;

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
        return loanRequestManager.findAll();
    }

    @RequestMapping(value = "/loan-request/mine", method = RequestMethod.GET)
    public List getMineLoanRequests(HttpServletRequest request){
        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return loanRequestManager.findAll();
    }

    @RequestMapping(value = "/loan-request/{id}/{newStatus}", method = RequestMethod.GET)
    public ResponseEntity changeLoanRequestStatus(HttpServletRequest request, @PathVariable String newStatus, @PathVariable long id){
        String token = request.getHeader(tokenHeader);
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String username = jwtTokenUtil.getUsernameFromToken(token);
        if (loanRequestManager.changeLoanStatus(id, newStatus, username))
            status = HttpStatus.OK;
        System.out.println("Refresh status");
        return new ResponseEntity(null, status);
    }

}
