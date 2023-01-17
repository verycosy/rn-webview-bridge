import { Logger } from '@rnweb-template/common';
import { useEffect } from 'react';
import Bridge from '../utils/Bridge';

const useBridge = () => {
  useEffect(() => {
    window.executeCallback = (
      callbackName: string,
      callbackData: Record<string, unknown> | null,
      errorMessage?: string
    ) => {
      const callback = Bridge.getCallback(callbackName);

      if (!callback) {
        Bridge.pleaseTryAgain();
        Logger.error(`Can not found Callback ${callbackName}`);
        return;
      }

      const { resolve, reject } = callback;

      if (callbackData === null) {
        reject(new Error(errorMessage));
        Logger.error(`Callback ${callbackName} Rejected.`);
      } else {
        resolve(callbackData);
        Logger.log(`Callback ${callbackName} Resolved.`);
      }

      Bridge.removeCallback(callbackName);
    };
  }, []);
};

export default useBridge;
