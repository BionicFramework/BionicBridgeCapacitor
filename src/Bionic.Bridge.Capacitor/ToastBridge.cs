using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class ToastBridge {
        private const string ToastShowFunctionName = "BionicBridge.Capacitor.Toast.show";

        private static Task<string> Show(ToastShowOptions toastShowOptions) =>
            JSRuntime.Current.InvokeAsync<string>(ToastShowFunctionName, toastShowOptions);

        public static Task<string> ShowWithShortDuration(string message) =>
            Show(new ToastShowOptions { text = message, duration = "short" });

        public static Task<string> ShowWithLongDuration(string message) =>
            Show(new ToastShowOptions { text = message, duration = "long" });
    }
}