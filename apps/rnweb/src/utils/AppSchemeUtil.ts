const appScheme = 'sample';
const actionScheme = 'sample-action';

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

  static setHeaderTitle(title: string) {
    window.location.href = `${actionScheme}://setHeader?title=${title}`;
  }

  static closeWebView() {
    window.location.href = `${actionScheme}://close`;
  }
}

export default AppSchemeUtil;
