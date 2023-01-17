import { Logger } from '@rnweb-template/common';
import { useEffect } from 'react';

interface Callback {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

export class Bridge {
  private static readonly callbacks: Record<string, Callback> = {};

  static async getValueFromApp(key: string, params?: Record<string, unknown>) {
    return new Promise((resolve, reject) => {
      const callbackName = new Date().getTime() + '-' + key;

      Bridge.callbacks[callbackName] = {
        resolve,
        reject,
      };

      Logger.log(`Callback ${callbackName} Added.`);

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
    delete Bridge.callbacks[callbackName];
  }
}

const useBridge = () => {
  useEffect(() => {
    window.executeCallback = (
      callbackName: string,
      callbackData: Record<string, unknown> | null,
      errorMessage?: string
    ) => {
      const callback = Bridge.getCallback(callbackName);

      if (!callback) {
        Logger.error(`Can not found Callback ${callbackName}`);
        return;
      }

      if (callbackData === null) {
        Logger.log(`Callback ${callbackName} Rejected.`);
        callback.reject(new Error(errorMessage));
      } else {
        Logger.log(`Callback ${callbackName} Resolved.`);
        callback.resolve(callbackData);
      }

      Bridge.removeCallback(callbackName);
    };
  }, []);
};

export default useBridge;
