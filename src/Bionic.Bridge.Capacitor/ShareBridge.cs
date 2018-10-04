using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class ShareBridge {
        private const string ShareFunctionName = "BionicBridge.Capacitor.Share.share";

        public static Task<object> Share(ShareOptions shareOptions) =>
            JSRuntime.Current.InvokeAsync<object>(ShareFunctionName, shareOptions);
    }

    public class ShareOptions {
        public string title;
        public string text;
        public string url;
        public string dialogTitle;
    }
}