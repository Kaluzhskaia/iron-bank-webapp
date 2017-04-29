package ru.questboat.model;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by Mikhail Falaleev on 23.04.2017.
 */

@Entity
@Data
public class Loan {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    private Long id;
}
