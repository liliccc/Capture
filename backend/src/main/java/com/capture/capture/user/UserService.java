package com.capture.capture.user;

import com.capture.capture.error.NotFoundException;
import com.capture.capture.user.vm.UserUpdateVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	UserRepository userRepository;

	PasswordEncoder passwordEncoder;
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	public void save(Users user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}

	public Page<Users> getUsers(Users loggedInUser, Pageable pageable) {
		if(loggedInUser != null) {
			return userRepository.findByUsernameNot(loggedInUser.getUsername(), pageable);
		}
		return userRepository.findAll(pageable);
	}

	public Users getByUsername(String username) {
		Users inDB = userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException(username + " not found");
		}
		return inDB;
	}

	public Users update(long id, UserUpdateVM userUpdate) {
		Users inDB = userRepository.getOne(id);
		inDB.setDisplayName(userUpdate.getDisplayName());
		return userRepository.save(inDB);
	}

}
