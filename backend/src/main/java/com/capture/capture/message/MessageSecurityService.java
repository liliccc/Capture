package com.capture.capture.message;

import com.capture.capture.user.Users;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageSecurityService {
	
	MessageRepository hoaxRepository;
	
	public MessageSecurityService(MessageRepository hoaxRepository) {
		super();
		this.hoaxRepository = hoaxRepository;
	}

	public boolean isAllowedToDelete(long hoaxId, Users loggedInUser) {
		Optional<Message> optionalHoax = hoaxRepository.findById(hoaxId);
		if(optionalHoax.isPresent()) {
			Message inDB = optionalHoax.get();
			return inDB.getUser().getId() == loggedInUser.getId();
		}
		return false;
	}

}
