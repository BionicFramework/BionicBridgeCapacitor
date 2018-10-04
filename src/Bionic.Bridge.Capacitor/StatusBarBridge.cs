using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class StatusBarBridge {
        private const string StatusBarShowFunctionName = "BionicBridge.Capacitor.StatusBar.show";
        private const string StatusBarHideFunctionName = "BionicBridge.Capacitor.StatusBar.hide";

        private const string StatusBarSetBackgroundColorFunctionName =
            "BionicBridge.Capacitor.StatusBar.setBackgroundColor";

        private const string StatusBarSetStyleFunctionName = "BionicBridge.Capacitor.StatusBar.setStyle";

        public static Task Show() =>
            JSRuntime.Current.InvokeAsync<object>(StatusBarShowFunctionName);

        public static Task Hide() =>
            JSRuntime.Current.InvokeAsync<object>(StatusBarHideFunctionName);

        public static Task SetBackgroundColor(string color) =>
            JSRuntime.Current.InvokeAsync<object>(StatusBarSetBackgroundColorFunctionName, color);

        public static Task SetStyle(StatusBarStyle style) =>
            JSRuntime.Current.InvokeAsync<object>(StatusBarSetStyleFunctionName, style);
    }

    public enum StatusBarStyle {
        Dark,
        Light
    }
}