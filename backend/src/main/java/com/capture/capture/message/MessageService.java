package com.capture.capture.message;

import com.capture.capture.user.UserService;
import com.capture.capture.user.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;

    UserService userService;

    public MessageService(MessageRepository messageRepository, UserService userService) {
        super();
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    public Message save(Users user, Message message) {
        message.setTimestamp(new Date());
        message.setUser(user);
        return messageRepository.save(message);
    }

    public Page<Message> getAllMessages(Pageable pageable) {
        return messageRepository.findAll(pageable);
    }

    public Page<Message> getMessagesOfUser(String username, Pageable pageable) {
        Users user = userService.getByUsername(username);
        return messageRepository.findByUser(user, pageable);
    }

    public Page<Message> getOldMessages(long id, String username, Pageable pageable) {
        Specification<Message> messageSpecification = Specification.where(idLessThan(id));
        if (username != null) {
            Users user = userService.getByUsername(username);
            messageSpecification = messageSpecification.and(userIs(user));
        }
        return messageRepository.findAll(messageSpecification, pageable);
    }


    public List<Message> getNewMessages(long id, String username, Pageable pageable) {
        Specification<Message> spec = Specification.where(idGreaterThan(id));
        if (username != null) {
            Users inDB = userService.getByUsername(username);
            spec = spec.and(userIs(inDB));
        }
        return messageRepository.findAll(spec, pageable.getSort());
    }

    public long getNewMessagesCount(long id, String username) {
        Specification<Message> spec = Specification.where(idGreaterThan(id));
        if (username != null) {
            Users inDB = userService.getByUsername(username);
            spec = spec.and(userIs(inDB));
        }
        return messageRepository.count(spec);
    }

    private Specification<Message> userIs(Users user) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user"), user);
    }

    private Specification<Message> idLessThan(long id) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get("id"), id);
    }

    private Specification<Message> idGreaterThan(long id) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("id"), id);
    }

    public void deleteMessage(long id) {
        messageRepository.deleteById(id);
    }


}
