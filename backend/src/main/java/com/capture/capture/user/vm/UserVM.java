package com.capture.capture.user.vm;

import com.capture.capture.user.Users;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserVM {
	
	private long id;
	
	private String username;
	
	private String displayName;
	
	private String image;
	
	public UserVM(Users user) {
		this.setId(user.getId());
		this.setUsername(user.getUsername());
		this.setDisplayName(user.getDisplayName());
		this.setImage(user.getImage());
	}

}
