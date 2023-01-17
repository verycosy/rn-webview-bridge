import { WebViewCommand } from '@rnweb-template/types';

const appScheme = 'sample';
const actionScheme = 'sample-action';

type ActionUrl = `${typeof actionScheme}://${WebViewCommand}`;

class AppSchemeUtil {
  static goToWebView(url: string) {
    const [href, hash] = url.split('#');
    const title = hash ?? '';

    window.location.href = `${appScheme}://webview?url=${encodeURIComponent(
      window.location.origin + href
    )}&title=${title}`;
  }

  static goToScreen(url: string) {
    window.location.href = `${appScheme}://${url}`;
  }

  static share(url: string, title: string, message: string) {
    window.location.href = `${actionScheme}://share?url=${url}&title=${title}&message=${message}`;
  }

  static setHeaderTitle(title: string) {
    window.location.href = `${actionScheme}://setHeader?title=${title}`;
  }

  static closeWebView() {
    window.location.href = `${actionScheme}://close`;
  }
}

export default AppSchemeUtil;
