package com.capture.capture.user;

import com.capture.capture.shared.CurrentUser;
import com.capture.capture.shared.GenericResponse;
import com.capture.capture.user.vm.UserUpdateVM;
import com.capture.capture.user.vm.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/users")
	GenericResponse createUser(@Valid @RequestBody Users user) {
		userService.save(user);
		return new GenericResponse("User saved");
	}
	
	@GetMapping("/users")
	Page<UserVM> getUsers(@CurrentUser Users loggedInUser, Pageable page) {
		return userService.getUsers(loggedInUser, page).map(UserVM::new);
	}
	
	@GetMapping("/users/{username}")
	UserVM getUserByName(@PathVariable String username) {
		Users user = userService.getByUsername(username);
		return new UserVM(user);
	}
	
	@PutMapping("/users/{id:[0-9]+}")
	@PreAuthorize("#id == principal.id")
	UserVM updateUser(@PathVariable long id, @Valid @RequestBody(required = false) UserUpdateVM userUpdate) {
		Users updated = userService.update(id, userUpdate);
		return new UserVM(updated);
	}
}
