package se.workout.RESTApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import se.workout.RESTApp.domain.Session;
import se.workout.RESTApp.repository.SessionRepository;

/**
 * Created by Jaam on 2017-06-21.
 */
public class SessionServiceImpl implements SessionService {

    @Autowired
    SessionRepository sessionRepository;

    public SessionServiceImpl() {
    }

    @Override
    public Session findById(String id) {
        return sessionRepository.findById(id);
    }

    @Override
    public Session create(Session session) {
        return sessionRepository.save(session);
    }
}
