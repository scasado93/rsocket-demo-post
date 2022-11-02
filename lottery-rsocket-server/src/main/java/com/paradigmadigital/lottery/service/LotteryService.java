package com.paradigmadigital.lottery.service;

import com.paradigmadigital.lottery.model.RequestData;
import reactor.core.publisher.Flux;

public interface LotteryService {

    Flux<Integer> generateNumbers(RequestData data);
}
