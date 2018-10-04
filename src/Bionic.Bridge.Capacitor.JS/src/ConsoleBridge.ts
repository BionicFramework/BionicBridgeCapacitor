interface IConsole {
  log(message: object): Promise<void>;
}

export class ConsoleBridge implements IConsole {
  async log(message: object): Promise<void> {
    await console.log(message);
  }
}
