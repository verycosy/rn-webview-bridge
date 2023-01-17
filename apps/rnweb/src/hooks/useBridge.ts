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

      if (callbackData === null) {
        callback.reject(new Error(errorMessage));
      } else {
        callback.resolve(callbackData);
      }

      Bridge.removeCallback(callbackName);
    };
  }, []);
};

export default useBridge;
