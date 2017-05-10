package ru.questboat.service;

/**
 * Created by Mikhail Falaleev on 07.05.2017.
 */
public interface ConstantsForLoans {
    float interestRate = 1.15f;
    int periods = 12;
    /*
    1 month = 2592000000 mc
    1 day = 86400000 mc
    1 hour = 3600000 mc
    1 minute = 60000 mc
    */
    long periodTime = 30000;
}
