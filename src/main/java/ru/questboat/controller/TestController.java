package ru.questboat.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Mikhail Falaleev on 25.03.2017.
 */

@RestController
@RequestMapping(value = "/api")
public class TestController {

    @RequestMapping(value = "/admin/hello", method = RequestMethod.GET)
    public String testadm(){
        return "Hello, world";
    }

    @RequestMapping(value = "/user/hello", method = RequestMethod.GET)
    public String testuser(){
        return "Hello, world";
    }
}
