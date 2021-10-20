package com.capture.capture.message;

import com.capture.capture.message.vm.MessageVM;
import com.capture.capture.shared.CurrentUser;
import com.capture.capture.shared.GenericResponse;
import com.capture.capture.user.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/1.0")
public class MessageController {

	@Autowired
	MessageService messageService;

	@PostMapping("/msg")
	MessageVM createMessage(@Valid @RequestBody Message message, @CurrentUser Users user) {
		return new MessageVM(messageService.save(user, message));
	}
	
	@GetMapping("/msg")
	Page<MessageVM> getAllMessages(Pageable pageable) {
		return messageService.getAllMessages(pageable).map(MessageVM::new);
	}
	
	@GetMapping("/users/{username}/msg")
	Page<MessageVM> getMessagesOfUser(@PathVariable String username, Pageable pageable) {
		return messageService.getMessagesOfUser(username, pageable).map(MessageVM::new);
		
	}
	
	@GetMapping({"/msg/{id:[0-9]+}", "/users/{username}/msg/{id:[0-9]+}"})
	ResponseEntity<?> getMessagesRelative(@PathVariable long id,
										  @PathVariable(required= false) String username,
										  Pageable pageable,
										  @RequestParam(name="direction", defaultValue="after") String direction,
										  @RequestParam(name="count", defaultValue="false", required=false) boolean count
			) {
		if(!direction.equalsIgnoreCase("after")) {			
			return ResponseEntity.ok(messageService.getOldMessages(id, username, pageable).map(MessageVM::new));
		}
		
		if(count) {
			long newMessageCount = messageService.getNewMessagesCount(id, username);
			return ResponseEntity.ok(Collections.singletonMap("count", newMessageCount));
		}
		
		List<MessageVM> newMessages = messageService.getNewMessages(id, username, pageable).stream()
				.map(MessageVM::new).collect(Collectors.toList());
		return ResponseEntity.ok(newMessages);
	}
	
	@DeleteMapping("/msg/{id:[0-9]+}")
	@PreAuthorize("@messageSecurityService.isAllowedToDelete(#id, principal)")
	GenericResponse deleteMessage(@PathVariable long id) {
		messageService.deleteMessage(id);
		return new GenericResponse("Message is removed");
	}
	
	
	
	
}
