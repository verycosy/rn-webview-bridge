import { WebViewCommand } from '@rnweb-template/types';
import EventEmitter3 from 'eventemitter3';

const EventKey = {
  Action: 'action',
};

// 전역적으로 on/off 처리만 ? useNavigation은 navigation 함수 인자로 대체?
class WebViewActor {
  private static readonly eventEmitter = new EventEmitter3();

  static addListener(handler: (action: WebViewAction) => void) {
    WebViewActor.eventEmitter.on(EventKey.Action, handler);
  }

  static removeListener(handler: (action: WebViewAction) => void) {
    WebViewActor.eventEmitter.off(EventKey.Action, handler);
  }

  static emit(action: WebViewAction) {
    WebViewActor.eventEmitter.emit(EventKey.Action, action);
  }
}

export default WebViewActor;

export interface WebViewAction {
  command: WebViewCommand;
  data: Record<string, unknown>;
}
