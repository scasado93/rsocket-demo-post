import { ClientData } from './ClientData';
import {  RSocketClient, JsonSerializer, IdentitySerializer } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import { Flowable } from 'rsocket-flowable';
import { CancelCallback } from 'rsocket-flowable/Single';

export class Client {
  client: any;
  rsocket!: any;
  cancel!: CancelCallback;

  constructor(address: string) {
    this.client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer,
      },
      setup: {
        keepAlive: 10000,
        lifetime: 20000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0',
      },
      transport: new RSocketWebSocketClient({ url: address }),
    });
  }

  connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.connect().subscribe({
        onComplete: (rs: object) => {
          this.rsocket = rs;
          this.rsocket.connectionStatus().subscribe((status: object) => {
            console.info(status);
          });

          resolve(this.rsocket);
        },
        onError: (error: Error) => {
          reject(error);
        },
        onSubscribe: (cancel: CancelCallback) => {
          this.cancel = cancel;
        },
      });
    });
  }

  requestStream(clientData: ClientData): Flowable<any> {
    return this.rsocket.requestStream({
      data: clientData,
      metadata:
        String.fromCharCode('generate.numbers'.length) + 'generate.numbers',
    });
  }

  disconnect(): void {
    this.client.close();
  }
}
