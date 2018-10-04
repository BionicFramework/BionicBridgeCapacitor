import {BrowserBridge} from "./BrowserBridge";
import {ToastBridge} from './ToastBridge';
import {ConsoleBridge} from "./ConsoleBridge";
import {CameraBridge} from "./CameraBridge";
import {DeviceBridge} from "./DeviceBridge";
import {GeolocationBridge} from "./GeolocationBridge";
import {KeyboardBridge} from "./KeyboardBridge";
import {ModalsBridge} from "./ModalsBridge";
import {StorageBridge} from "./StorageBridge";
import {ShareBridge} from "./ShareBridge";
import {StatusBarBridge} from "./StatusBarBridge";
import {SplashScreenBridge} from "./SplashScreenBridge";
import {NetworkBridge} from "./NetworkBridge";
import {MotionBridge} from "./MotionBridge";
import {HapticsBridge} from "./HapticsBridge";
import {FilesystemBridge} from "./FilesystemBridge";
import {ClipboardBridge} from "./ClipboardBridge";
import {BackgroundTaskBridge} from "./BackgroundTaskBridge";
import {AppBridge} from "./AppBridge";
import {AccessibilityBridge} from "./AccessibilityBridge";

namespace BionicCapacitorBridge {
  const bridge: string = 'BionicBridge';
  // define what this extension adds to the window object inside BionicBridge
  const extensionObject = {
    Capacitor: {
      Accessibility: new AccessibilityBridge(),
      App: new AppBridge(),
      BackgroundTask: new BackgroundTaskBridge(),
      Browser: new BrowserBridge(),
      Camera: new CameraBridge(),
      Clipboard: new ClipboardBridge(),
      Console: new ConsoleBridge(),
      Device: new DeviceBridge(),
      Filesystem: new FilesystemBridge(),
      Geolocation: new GeolocationBridge(),
      Haptics: new HapticsBridge(),
      Keyboard: new KeyboardBridge(),
      Modals: new ModalsBridge(),
      Motion: new MotionBridge(),
      Network: new NetworkBridge(),
      Share: new ShareBridge(),
      SplashScreen: new SplashScreenBridge(),
      StatusBar: new StatusBarBridge(),
      Storage: new StorageBridge(),
      Toast: new ToastBridge()
    }
  };

  export function initialize(): void {
    if (typeof window !== 'undefined' && !window[bridge]) {
      // when the library is loaded in a browser via a <script> element, make the
      // following APIs available in global scope for invocation from JS
      window[bridge] = {
        ...extensionObject
      };
    } else {
      window[bridge] = {
        ...window[bridge],
        ...extensionObject
      };
    }
  }
}

BionicCapacitorBridge.initialize();
