package com.sg.hungrylillithrestservice.service;

import java.time.LocalDate;
import java.time.LocalTime;

public final class Validations {

    // email regex pattern found at https://emailregex.com/ 
    public static final String EMAIL_REGEX = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
            + "[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f"
            + "\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\""
            + ")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])"
            + "?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]"
            + "|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-"
            + "\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";

    public static boolean inRange(int value, int min, int max) {
        return value >= min && value <= max;
    }

    public static boolean isPositiveAndNotZero(int value) {
        return value > 0;
    }

    static <T> boolean isNull(T object) {
        return object == null;
    }

    public static boolean isNullOrWhitespace(String value) {
        return value == null || value.trim().length() == 0;
    }

    public static boolean isUnique(int[] allInts, int id) {
        for (int i = 0; i < allInts.length; i++) {
            if (allInts[id] == allInts[i] && id != i) {
                return false;
            }
        }
        return true;
    }

    public static boolean timeIsBefore(LocalTime firstTime, LocalTime secondTime) {
        return firstTime.isBefore(secondTime);
    }

    public static boolean timeIsBeforeOrEqual(LocalTime firstTime, LocalTime secondTime) {
        return firstTime.isBefore(secondTime) || firstTime.equals(secondTime);
    }

    public static boolean dateIsBefore(LocalDate firstDate, LocalDate secondDate) {
        return firstDate.isBefore(secondDate);
    }

    public static boolean hasCharacters(String str) {
        if (str.matches(".*[a-zA-Z]+.*")) {
            return true;
        } else {
            return false;
        }
    }
}
