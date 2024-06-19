import React, { ReactElement, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { AppColors } from '@utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { ScreenProps } from '@navigation/Router'
import Header from '@components/Header'

export default function RevolutWebScreen({
  navigation,
}: ScreenProps<'RevolutWeb'>): ReactElement {
  const webViewRef = useRef<WebView>(null)
  const [webViewcanGoBack, setWebViewcanGoBack] = useState(false)

  // const url = 'https://revolut.com'
  // const url = 'https://nodeguardians.io'
  const url = 'https://www.strava.com'

  const injectedJavaScript = `(function() {
  const oldOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    console.log('--- New Request ---');
    console.log('Method:', method);
    console.log('URL:', url);
    const headers = {};

    // Optional: Capture Headers
    if (this.setRequestHeader) {
      for (let i = 0; i < this.getAllResponseHeaders().length; i++) {
        const header = this.getAllResponseHeaders()[i].split(':')[0].trim();
        headers[header] = this.getAllResponseHeaders()[i].split(':')[1].trim();
      }
      console.log('Headers:', headers);
    }

    const request = { type: 'request', method, url, headers };
    window.ReactNativeWebView.postMessage(JSON.stringify(request, null, 2));

    this.addEventListener('load', () => {
      console.log('--- Response ---');
      console.log('Status:', this.status);
      console.log('Response:', this.responseText);
      const response = { type: 'response', status: this.status, response: this.responseText };
      window.ReactNativeWebView.postMessage(JSON.stringify(response, null, 2));
    });

    oldOpen.call(this, method, url, async, user, password);
  };
})();`

  function handleReceiveMessage(event: WebViewMessageEvent): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { type } = JSON.parse(event.nativeEvent.data)
    console.log(`--- Network ${type} ---`)
    console.log(event.nativeEvent.data)
    console.log('\n\n\n\n')
  }

  function goBack(): void {
    if (webViewcanGoBack) webViewRef.current?.goBack()
    else navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Zap Web" onBackPress={goBack} />
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => {
          if (event.nativeEvent.data === 'close') {
            navigation.goBack()
          } else {
            handleReceiveMessage(event)
          }
        }}
        onLoadProgress={({ nativeEvent }) => {
          setWebViewcanGoBack(nativeEvent.canGoBack)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
})
