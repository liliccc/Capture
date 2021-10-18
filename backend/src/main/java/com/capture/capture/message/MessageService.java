package com.capture.capture.message;

import com.capture.capture.user.UserService;
import com.capture.capture.user.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageService {

    MessageRepository hoaxRepository;

    UserService userService;

    public MessageService(MessageRepository hoaxRepository, UserService userService) {
        super();
        this.hoaxRepository = hoaxRepository;
        this.userService = userService;
    }

    public Message save(Users user, Message hoax) {
        hoax.setTimestamp(new Date());
        hoax.setUser(user);
        return hoaxRepository.save(hoax);
    }

    public Page<Message> getAllHoaxes(Pageable pageable) {
        return hoaxRepository.findAll(pageable);
    }

    public Page<Message> getHoaxesOfUser(String username, Pageable pageable) {
        Users inDB = userService.getByUsername(username);
        return hoaxRepository.findByUser(inDB, pageable);
    }

    public Page<Message> getOldHoaxes(long id, String username, Pageable pageable) {
        Specification<Message> spec = Specification.where(idLessThan(id));
        if (username != null) {
            Users inDB = userService.getByUsername(username);
            spec = spec.and(userIs(inDB));
        }
        return hoaxRepository.findAll(spec, pageable);
    }


    public List<Message> getNewHoaxes(long id, String username, Pageable pageable) {
        Specification<Message> spec = Specification.where(idGreaterThan(id));
        if (username != null) {
            Users inDB = userService.getByUsername(username);
            spec = spec.and(userIs(inDB));
        }
        return hoaxRepository.findAll(spec, pageable.getSort());
    }

    public long getNewHoaxesCount(long id, String username) {
        Specification<Message> spec = Specification.where(idGreaterThan(id));
        if (username != null) {
            Users inDB = userService.getByUsername(username);
            spec = spec.and(userIs(inDB));
        }
        return hoaxRepository.count(spec);
    }

    private Specification<Message> userIs(Users user) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("user"), user);
        };
    }

    private Specification<Message> idLessThan(long id) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.lessThan(root.get("id"), id);
        };
    }

    private Specification<Message> idGreaterThan(long id) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.greaterThan(root.get("id"), id);
        };
    }

    public void deleteHoax(long id) {
        Message hoax = hoaxRepository.getOne(id);
        hoaxRepository.deleteById(id);

    }


}
