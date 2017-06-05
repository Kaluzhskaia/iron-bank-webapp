package ru.questboat.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

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

    @OneToOne
    @NotNull
    @JsonView(View.Summary.class)
    private LoanRequest loanRequest;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonView(View.Summary.class)
    private Date issueDate;

    @JsonView(View.Summary.class)
    private long payed;

    @JsonView(View.Summary.class)
    private int periodCount;

    @JsonView(View.Summary.class)
    @NotNull
    private float interestRate;

    @JsonView(View.Summary.class)
    private boolean isRepaid;


}
