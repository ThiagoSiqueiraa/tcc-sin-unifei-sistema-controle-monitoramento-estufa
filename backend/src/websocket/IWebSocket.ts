interface IWebSocket {
  emit(topic: string, data: any): void;
}

export type { IWebSocket };
