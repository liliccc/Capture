package com.capture.capture.message;

import com.capture.capture.shared.CurrentUser;
import com.capture.capture.shared.GenericResponse;
import com.capture.capture.user.Users;
import com.capture.capture.message.vm.MessageVM;
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
	MessageService hoaxService;

	@PostMapping("/hoaxes")
	MessageVM createHoax(@Valid @RequestBody Message hoax, @CurrentUser Users user) {
		return new MessageVM(hoaxService.save(user, hoax));
	}
	
	@GetMapping("/hoaxes")
	Page<MessageVM> getAllHoaxes(Pageable pageable) {
		return hoaxService.getAllHoaxes(pageable).map(MessageVM::new);
	}
	
	@GetMapping("/users/{username}/hoaxes")
	Page<MessageVM> getHoaxesOfUser(@PathVariable String username, Pageable pageable) {
		return hoaxService.getHoaxesOfUser(username, pageable).map(MessageVM::new);
		
	}
	
	@GetMapping({"/hoaxes/{id:[0-9]+}", "/users/{username}/hoaxes/{id:[0-9]+}"}) 
	ResponseEntity<?> getHoaxesRelative(@PathVariable long id,
			@PathVariable(required= false) String username,
			Pageable pageable,
			@RequestParam(name="direction", defaultValue="after") String direction,
			@RequestParam(name="count", defaultValue="false", required=false) boolean count
			) {
		if(!direction.equalsIgnoreCase("after")) {			
			return ResponseEntity.ok(hoaxService.getOldHoaxes(id, username, pageable).map(MessageVM::new));
		}
		
		if(count == true) {
			long newHoaxCount = hoaxService.getNewHoaxesCount(id, username);
			return ResponseEntity.ok(Collections.singletonMap("count", newHoaxCount));
		}
		
		List<MessageVM> newHoaxes = hoaxService.getNewHoaxes(id, username, pageable).stream()
				.map(MessageVM::new).collect(Collectors.toList());
		return ResponseEntity.ok(newHoaxes);
	}
	
	@DeleteMapping("/hoaxes/{id:[0-9]+}")
	@PreAuthorize("@messageSecurityService.isAllowedToDelete(#id, principal)")
	GenericResponse deleteHoax(@PathVariable long id) {
		hoaxService.deleteHoax(id);
		return new GenericResponse("Hoax is removed");
	}
	
	
	
	
}
