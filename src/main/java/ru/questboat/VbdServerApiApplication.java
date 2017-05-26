package ru.questboat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.questboat.repository.CollectorMissionRepository;

@SpringBootApplication
public class VbdServerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(VbdServerApiApplication.class, args);
	}


}
