package com.capture.capture.user;

import com.capture.capture.message.Message;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.beans.Transient;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Entity
public class Users implements UserDetails{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4074374728582967483L;
	
	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message = "{hoaxify.constraints.username.NotNull.message}")
	@Size(min = 4, max=255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@Size(min = 4, max=255)
	private String displayName;
	
	@NotNull
	@Size(min = 8, max=255)
	private String password;
	
	private String image;
	
	@OneToMany(mappedBy = "user")
	private List<Message> hoaxes;

	@Override
	@Transient
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_USER");
	}

	@Override
	@Transient
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@Transient
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@Transient
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@Transient
	public boolean isEnabled() {
		return true;
	}

}
