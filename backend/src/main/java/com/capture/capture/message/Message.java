package com.capture.capture.message;

import com.capture.capture.user.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Setter
@Getter
@ToString
@Entity
public class Message {
	
	@Id
	@GeneratedValue
	private long id;

	@NotNull
	@Size(min = 2, max=5000)
	@Column(length = 5000)
	private String content;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;
	
	@ManyToOne
	private Users user;

}
