using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class SplashScreenBridge {
        private const string SplashScreenShowFunctionName = "BionicBridge.Capacitor.SplashScreen.show";
        private const string SplashScreenHideFunctionName = "BionicBridge.Capacitor.SplashScreen.hide";

        public static Task Show(SplashScreenShowOptions options = null) =>
            JSRuntime.Current.InvokeAsync<object>(SplashScreenShowFunctionName, options);

        public static Task Hide(SplashScreenHideOptions options = null) =>
            JSRuntime.Current.InvokeAsync<object>(SplashScreenHideFunctionName, options);
    }

    public class SplashScreenShowOptions {
        public bool autoHide;
        public long fadeInDuration;
        public long fadeOutDuration;
        public long showDuration;
    }

    public class SplashScreenHideOptions {
        public long fadeOutDuration;
    }
}