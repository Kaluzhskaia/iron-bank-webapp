package ru.questboat.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Mikhail Falaleev on 10.04.2017.
 */

@Entity
@Data
public class LoanRequest {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    private Long id;

    @Column(name = "USERNAME", length = 50)
    @NotNull
    private long amount;

    @Column(name = "PASSWORD", length = 100)
    @NotNull
    private String purpose;

    @Column(name = "FIRSTNAME", length = 50)
    @NotNull
    @Size(min = 2, max = 50)
    private String firstName;
}
