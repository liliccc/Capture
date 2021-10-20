package com.capture.capture.message;

import com.capture.capture.user.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageSecurityService {
	@Autowired
	MessageRepository messageRepository;
	
	public MessageSecurityService(MessageRepository messageRepository) {
		super();
		this.messageRepository = messageRepository;
	}

	public boolean isAllowedToDelete(long hoaxId, Users loggedInUser) {
		Optional<Message> optionalMessage = messageRepository.findById(hoaxId);
		if(optionalMessage.isPresent()) {
			Message message = optionalMessage.get();
			return message.getUser().getId() == loggedInUser.getId();
		}
		return false;
	}

}
