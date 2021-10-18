package com.capture.capture.message.vm;

import com.capture.capture.message.Message;
import com.capture.capture.user.vm.UserVM;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MessageVM {
	
	private long id;
	
	private String content;
	
	private long date;
	
	private UserVM user;
	
	public MessageVM(Message hoax) {
		this.setId(hoax.getId());
		this.setContent(hoax.getContent());
		this.setDate(hoax.getTimestamp().getTime());
		this.setUser(new UserVM(hoax.getUser()));

	}

}
