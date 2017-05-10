package ru.questboat.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@Entity
@Data
public class CollectorMission {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    private Long id;

    @OneToOne
    @NotNull
    private User client;

    @OneToOne
    private User collector;

    private CollectorMissionType type;

    private String report;

    private CollectorMissionStatus status;

    private boolean isChecked;


}
