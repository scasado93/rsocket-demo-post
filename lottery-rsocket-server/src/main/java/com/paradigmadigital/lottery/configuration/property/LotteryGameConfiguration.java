package com.paradigmadigital.lottery.configuration.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "lottery.numbers")
public class LotteryGameConfiguration {

    private MainNumber main;

    private SpecialNumber special;

    public MainNumber getMain() {
        return main;
    }

    public void setMain(MainNumber main) {
        this.main = main;
    }

    public SpecialNumber getSpecial() {
        return special;
    }

    public void setSpecial(SpecialNumber special) {
        this.special = special;
    }

    public static class MainNumber {
        private Integer min;
        private Integer max;

        public Integer getMin() {
            return min;
        }

        public void setMin(Integer min) {
            this.min = min;
        }

        public Integer getMax() {
            return max;
        }

        public void setMax(Integer max) {
            this.max = max;
        }
    }

    public static class SpecialNumber {
        private Integer min;
        private Integer max;

        public Integer getMin() {
            return min;
        }

        public void setMin(Integer min) {
            this.min = min;
        }

        public Integer getMax() {
            return max;
        }

        public void setMax(Integer max) {
            this.max = max;
        }
    }
}
