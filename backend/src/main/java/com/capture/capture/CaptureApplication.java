package com.capture.capture;

import com.capture.capture.user.UserService;
import com.capture.capture.user.Users;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.util.stream.IntStream;

@SpringBootApplication
public class CaptureApplication {

	public static void main(String[] args) {
		SpringApplication.run(CaptureApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner run(UserService userService) {
		return (args) -> {
			IntStream.rangeClosed(1,20)
				.mapToObj(i -> {
					Users user = new Users();
					user.setUsername("TestUser"+i);
					user.setDisplayName("TestUser"+i);
					user.setPassword("P4ssword");
					return user;
				})
				.forEach(userService::save);
			
		};
	}
}
