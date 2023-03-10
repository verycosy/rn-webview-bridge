import { Logger } from '@rnweb-template/common';

interface Callback {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  timerId: NodeJS.Timeout;
}

const CALLBACK_TIMEOUT = 60 * 2 * 1000; // NOTE: 2분

class Bridge {
  private static readonly callbacks: Record<string, Callback> = {};

  static pleaseTryAgain() {
    alert('작업 시간 초과. 다시 시도해주세요.');
  }

  static async getValueFromApp(key: string, params?: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      const callbackName = new Date().getTime() + '-' + key;

      const timerId = setTimeout(() => {
        reject(new Error('Callback timeout'));
        Bridge.removeCallback(callbackName);

        Bridge.pleaseTryAgain();
        Logger.error(`Callback timeout ${callbackName}`);
      }, CALLBACK_TIMEOUT);

      Bridge.callbacks[callbackName] = {
        resolve,
        reject,
        timerId,
      };

      Logger.log(`Callback ${callbackName} Added.`);
      Logger.log(JSON.stringify(Bridge.callbacks));

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          callbackName,
          params,
        })
      );
    });
  }

  static getCallback(callbackName: string) {
    return Bridge.callbacks[callbackName];
  }

  static removeCallback(callbackName: string) {
    clearTimeout(Bridge.callbacks[callbackName].timerId);
    delete Bridge.callbacks[callbackName];
    Logger.log(JSON.stringify(Bridge.callbacks));
  }
}

export default Bridge;
