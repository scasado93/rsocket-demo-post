import { Client } from '../core/class/Client';
import { ClientData } from '../core/class/ClientData';
import { ClientDto } from '../core/dto/ClientDto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
})
export class LotteryComponent implements OnInit {
  client!: Client;
  requestStreamSubscription: any;
  htmlToAdd: number;
  address: string;
  connected: boolean;
  streamInProgress: boolean;
  channelInProgress: boolean;

  constructor(private router: Router) {
    (this.connected = false),
      (this.streamInProgress = false),
      (this.channelInProgress = false),
      (this.address = 'ws://127.0.0.1:8081/lottery-game');
    this.htmlToAdd = 0;
  }

  ngOnInit(): void {
    this.connectClient();
    this.clearResults();
  }

  connectClient(): void {
    if (!this.connected) {
      this.client = new Client(this.address);
      this.client.connect().then(() => {
        this.connected = true;
        this.getNumbers(5, false, '1');
      });
    } else {
      this.client.disconnect();
      this.connected = false;
    }
  }

  printResults(resultNumber: number, id: string, isSpecial: boolean): void {
    const results = document.querySelector(`#results-${id}`);
    if (!isSpecial) {
      results?.insertAdjacentHTML(
        'beforeend',
        `<svg width="250" height="250">
          <circle cx="125" cy="125" r="100" fill="#${this.randomColor()}" />
          <text x="50%" y="50%" text-anchor="middle" fill="white" stroke="black" stroke-width="2" font-size="100px" font-family="Arial" dy=".3em">${resultNumber}</text>
          Sorry, your browser does not support inline SVG.
        </svg>`
      );
    } else {
      results?.insertAdjacentHTML(
        'beforeend',
        `<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">
          <polygon points="150,60 90,230 240,110 60,110 210,230" fill="#${this.randomColor()}" />
          <text x="150" y="160" text-anchor="middle" fill="white" stroke="black" stroke-width="2" font-size="60">${resultNumber}</text>
          Sorry, your browser does not support inline SVG.
        </svg>`
      );
    }
  }

  getNumbers(
    totalNumbers: number,
    isSpecial: boolean,
    idContent: string
  ): void {
    if (!this.streamInProgress) {
      const requestedMsg = totalNumbers;
      let processedMsg = 0;
      const clientData = new ClientData(totalNumbers, isSpecial);

      this.client.requestStream(clientData).subscribe({
        onSubscribe: (sub: object) => {
          this.requestStreamSubscription = sub;
          this.requestStreamSubscription.request(requestedMsg);
          this.streamInProgress = true;
        },
        onError: (error: Error) => {
          console.error(error);
        },
        onNext: (clientDto: ClientDto) => {
          this.printResults(clientDto.data, idContent, isSpecial);
          processedMsg++;

          if (processedMsg >= requestedMsg) {
            this.requestStreamSubscription.request(requestedMsg);
            processedMsg = 0;
          }
        },
        onComplete: () => {
          this.streamInProgress = false;
          if (!isSpecial) {
            this.getNumbers(2, true, '2');
          } else {
            this.client.disconnect();
            this.connected = false;
            this.goToHome();
          }
        },
      });
    } else {
      this.requestStreamSubscription.cancel();
    }
  }

  clearResults(): void {
    const results = document.querySelector('#results-1');
    const results2 = document.querySelector('#results-2');

    results!.innerHTML = '';
    results2!.innerHTML = '';
  }

  goToHome(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 5000);
  }

  randomColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
}
