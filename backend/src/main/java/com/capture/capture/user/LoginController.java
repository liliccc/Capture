package com.capture.capture.user;

import com.capture.capture.shared.CurrentUser;
import com.capture.capture.user.vm.UserVM;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	
	@PostMapping("/api/1.0/login")
	UserVM handleLogin(@CurrentUser Users loggedInUser) {
		return new UserVM(loggedInUser);
	}
	
}
