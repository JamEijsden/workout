package se.workout.RESTApp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Jaam on 2017-06-22.
 */
public class Schema {

    @Id
    private String id;

    private String name;
    private String description;
    private Date lastActivity;
    private Double rated = 0.0;

    @DBRef
    private List<Group> groups = new ArrayList();

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getLastActivity() {
        return lastActivity;
    }

    public void setLastActivity(Date lastActivity) {
        this.lastActivity = lastActivity;
    }

    public List<Group> getGroups() {
        return groups;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    public Double getRated() {
        return rated;
    }

    public void setRated(Double rated) {
        this.rated = rated;
    }

    @Override
    public String toString() {
        return "Schema{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", lastActivity=" + lastActivity + '\'' +
                ", rated=" + rated + '\'' +
                ", groups=" + groups +
                '}';
    }
}
