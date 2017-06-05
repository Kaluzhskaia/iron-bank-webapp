package ru.questboat.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.questboat.service.LoanManager;
import ru.questboat.service.jwt.JwtTokenUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public List getAllLoanRequests(){
        return loanManager.findAll();
    }

    @RequestMapping(value = "/loan/mine", method = RequestMethod.GET)
    public List getMineLoanRequests(HttpServletRequest request){
        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        return loanManager.findByClient(username);
    }


    @RequestMapping(value = "/loan/should-be-payed/{id}", method = RequestMethod.GET)
    public ResponseEntity<Map<String, String>> getShouldBePayed(HttpServletRequest request, @PathVariable long id){
        HttpStatus status = HttpStatus.OK;
        Map<String, String> map = new HashMap<>();
        String shouldPayed = String.valueOf(loanManager.getShouldPayed(id));
        map.put("shouldPayed", shouldPayed);
        return new ResponseEntity<>(map, status);
    }

    @RequestMapping(value = "/loan/pay/{id}", method = RequestMethod.POST)
    public ResponseEntity payLoan(@RequestParam("pay") String pay,  @PathVariable long id){
        loanManager.pay(id, Long.valueOf(pay));
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
