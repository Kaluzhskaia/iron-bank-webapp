package ru.questboat.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Mikhail Falaleev on 25.03.2017.
 */

@RestController
@RequestMapping(value = "/")
public class TestController {

    @RequestMapping(value = "hello", method = RequestMethod.GET)
    public String test(){
        return "Hello, world";
    }
}
