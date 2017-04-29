package ru.questboat.model;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

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
    @JsonView(View.Summary.class)
    private Long id;

    @OneToOne
    @NotNull
    @JsonView(View.Summary.class)
    private User client;

    @NotNull
    @JsonView(View.Summary.class)
    private String amount;

    @NotNull
    @JsonView(View.Summary.class)
    private String purpose;

    @NotNull
    @JsonView(View.Summary.class)
    private String guarantor;

    @NotNull
    @JsonView(View.Summary.class)
    private String pledge;

    @NotNull
    @JsonView(View.Summary.class)
    private String income;

    @NotNull
    @Enumerated(EnumType.STRING)
    @JsonView(View.Summary.class)
    private LoanRequestStatus loanRequestStatus;

    @OneToOne
    @JsonView(View.Summary.class)
    private User manger;

    @JsonView(View.Summary.class)
    private Date requestTime;

    @JsonView(View.Summary.class)
    private Date reviewTime;
}
