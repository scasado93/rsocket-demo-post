package com.paradigmadigital.lottery.model;

public final class RequestData {

    private final Integer numbersAmount;
    private final boolean special;

    public RequestData(final Integer numbersAmount, final boolean special) {
        this.numbersAmount = numbersAmount;
        this.special = special;
    }

    public Integer getNumbersAmount() {
        return numbersAmount;
    }

    public boolean isSpecial() {
        return special;
    }

    @Override
    public String toString() {
        return "RequestData [" +
                "numbersAmount = " + numbersAmount +
                ", special = " + special +
                " ]";
    }
}
