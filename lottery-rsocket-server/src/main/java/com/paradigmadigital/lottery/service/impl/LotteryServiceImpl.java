package com.paradigmadigital.lottery.service.impl;

import com.paradigmadigital.lottery.configuration.property.LotteryGameConfiguration;
import com.paradigmadigital.lottery.model.RequestData;
import com.paradigmadigital.lottery.service.LotteryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class LotteryServiceImpl implements LotteryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(LotteryServiceImpl.class);
    private final LotteryGameConfiguration config;

    public LotteryServiceImpl(final LotteryGameConfiguration config) {
        this.config = config;
    }

    @Override
    public Flux<Integer> generateNumbers(RequestData data) {
        LOGGER.info(">>> Starting raffle");
        List<Integer> numbersInRaffle;
        if (data.isSpecial()) {
            numbersInRaffle = IntStream
                    .rangeClosed(this.config.getSpecial().getMin(), this.config.getSpecial().getMax())
                    .boxed()
                    .collect(Collectors.toList());
        } else {
            numbersInRaffle = IntStream
                    .rangeClosed(this.config.getMain().getMin(), this.config.getMain().getMax())
                    .boxed()
                    .collect(Collectors.toList());
        }
        List<Integer> winnerNumbers = this.startRaffle(numbersInRaffle, data.getNumbersAmount());
        LOGGER.info(">>> Winner numbers: {}. Are special ?: {}", winnerNumbers, data.isSpecial());
        return Flux.fromIterable(winnerNumbers);
    }

    private List<Integer> startRaffle(List<Integer> numbersInRaffle, int amount) {
        LOGGER.info(">>> Drum is going around");
        Collections.shuffle(numbersInRaffle);
        return numbersInRaffle.stream().limit(amount).collect(Collectors.toList());
    }
}
