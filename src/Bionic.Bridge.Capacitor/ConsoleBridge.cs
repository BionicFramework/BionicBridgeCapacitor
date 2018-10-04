using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class ConsoleBridge {
        private const string ConsoleLogFunctionName = "BionicBridge.Capacitor.Console.log";

        public static Task Log(object message) =>
            JSRuntime.Current.InvokeAsync<object>(ConsoleLogFunctionName, message);
    }
}