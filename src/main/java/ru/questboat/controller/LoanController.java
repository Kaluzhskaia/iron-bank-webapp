package ru.questboat.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.questboat.service.LoanManager;
import ru.questboat.service.jwt.JwtTokenUtil;

import java.util.List;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@RestController
@RequestMapping(value = "/api")
public class LoanController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private LoanManager loanManager;

    @RequestMapping(value = "/loan", method = RequestMethod.GET)
    public List getAllLoanRequests(HttpServletRequest request){
        return loanManager.findAll();
    }

    @RequestMapping(value = "/loan/mine", method = RequestMethod.GET)
    public List getMineLoanRequests(HttpServletRequest request){
        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        return loanManager.findByClient(username);
    }
}
