package se.workout.RESTApp.domain;

import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * Created by Jaam on 2017-06-22.
 */
public class Session {

    @Id
    private String id;
    private Integer weight;
    private Integer sets;
    private Integer reps;
    private Date date;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getSets() {
        return sets;
    }

    public void setSets(Integer sets) {
        this.sets = sets;
    }

    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
