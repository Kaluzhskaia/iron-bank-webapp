package ru.questboat;

import io.jsonwebtoken.impl.crypto.RsaProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.questboat.model.Authority;

import java.security.KeyPair;
import java.util.UUID;

@SpringBootApplication
public class VbdServerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(VbdServerApiApplication.class, args);

	}
}
