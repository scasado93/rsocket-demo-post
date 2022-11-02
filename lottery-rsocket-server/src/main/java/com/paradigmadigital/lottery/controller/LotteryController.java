package com.paradigmadigital.lottery.controller;

import com.paradigmadigital.lottery.model.RequestData;
import com.paradigmadigital.lottery.service.LotteryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.time.Duration;

@Controller
public class LotteryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LotteryController.class);
    private static final Integer SECONDS_DELAY_EFFECT = 2;
    private final LotteryService lotteryService;

    public LotteryController(final LotteryService lotteryService) {
        this.lotteryService = lotteryService;
    }

    @MessageMapping("generate.numbers")
    Flux<Integer> generateLotteryNumbers(RequestData data) {
        LOGGER.info(">>> Executing Lottery game. Request data: {}", data);
        return this.lotteryService
                .generateNumbers(data)
                .delayElements(Duration.ofSeconds(SECONDS_DELAY_EFFECT));
    }

}
